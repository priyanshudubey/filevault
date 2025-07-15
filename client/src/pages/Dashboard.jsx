import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { auth, storage, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const handleLogout = () => {
    signOut(auth);
    navigate("/login");
  };

  useEffect(() => {
    const q = query(
      collection(db, "files"),
      where("userId", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFiles(filesData);
    });
    return unsubscribe;
  }, [currentUser]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first");
    const storageRef = ref(storage, `files/${currentUser.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await addDoc(collection(db, "files"), {
      url: downloadURL,
      name: file.name,
      createdAt: serverTimestamp(),
      userId: currentUser.uid,
    });
    alert("File uploaded successfully!");
    setFile(null);
  };

  const handleDelete = async (file) => {
    try {
      const fileRef = ref(storage, `files/${currentUser.uid}/${file.name}`);
      await deleteObject(fileRef);
      await deleteDoc(doc(db, "files", file.id));
      alert("File deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error deleting file");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-800 via-blue-900 to-gray-900 p-4 overflow-hidden">
      {/* Decorative blurred elements */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-purple-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-pink-500 opacity-20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>

      {/* Navbar */}
      <header className="relative z-10 flex justify-between items-center w-full py-4 px-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-md mb-8">
        <h1 className="text-white font-extrabold text-xl tracking-tight">
          FileVault 🔒
        </h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-200 hidden sm:inline">
            Welcome, {currentUser.email}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition">
            Logout
          </button>
        </div>
      </header>

      {/* Upload section */}
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg z-10 mb-8">
        <h2 className="text-white text-lg font-semibold mb-4">Upload a File</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
          {/* Custom styled file input */}
          <label className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md cursor-pointer transition text-center">
            Choose File
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* Show selected file name */}
          <span className="text-sm text-gray-300 truncate max-w-xs">
            {file ? file.name : "No file chosen"}
          </span>

          <button
            onClick={handleUpload}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition">
            Upload
          </button>
        </div>
      </div>

      {/* Files list section */}
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg z-10">
        <h2 className="text-white text-lg font-semibold mb-4">Your Files</h2>
        {files.length === 0 && (
          <p className="text-gray-300">No files uploaded yet!</p>
        )}
        <ul className="space-y-3">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white/10 border border-white/20 rounded-lg p-3 hover:bg-white/20 transition">
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 font-medium break-all hover:underline mb-2 sm:mb-0">
                {file.name}
              </a>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(file.url);
                    alert("Link copied to clipboard!");
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition">
                  Copy URL
                </button>
                <button
                  onClick={() => handleDelete(file)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
