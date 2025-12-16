import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

/* ================= API CONFIG ================= */
const AUTH_API = "https://port-pp3k.onrender.com/api/admin";
const PROJECT_API = "https://port-pp3k.onrender.com/api/projects";
const IMAGE_BASE = "https://port-pp3k.onrender.com/api/uploads";

/* ================= ANIMATION ================= */
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ================= TYPES ================= */
type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string | null;
};

export default function Admin() {
  /* ================= AUTH ================= */
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("admin_token")
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= UI ================= */
  const [loading, setLoading] = useState(true);

  /* ================= PROJECTS ================= */
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${AUTH_API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        setLoading(false);
      })
      .catch(() => {
        logout();
        setLoading(false);
      });
  }, [token]);

  /* ================= LOAD PROJECTS ================= */
  useEffect(() => {
    if (!token) return;

    fetch(PROJECT_API)
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, [token]);

  /* ================= LOGIN ================= */
  const login = async () => {
    const res = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const data = await res.json();
    if (!res.ok) return alert("Invalid credentials");

    localStorage.setItem("admin_token", data.token);
    setToken(data.token);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  /* ================= ADD / UPDATE ================= */
  const saveProject = async () => {
    if (!title || !description || !link) {
      alert("Title, description & link required");
      return;
    }

    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("link", link);
    if (image) form.append("image", image);

    const url = editingId
      ? `${PROJECT_API}/${editingId}`
      : PROJECT_API;

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    if (!res.ok) return alert("Failed to save project");

    resetForm();
    const refreshed = await fetch(PROJECT_API).then((r) => r.json());
    setProjects(refreshed);
  };

  /* ================= EDIT ================= */
  const editProject = (p: Project) => {
    setEditingId(p.id);
    setTitle(p.title);
    setDescription(p.description);
    setLink(p.link);
    setPreview(p.image ? `${IMAGE_BASE}/${p.image}` : null);
    setImage(null);
  };

  /* ================= DELETE ================= */
  const deleteProject = async (id: number) => {
    if (!confirm("Delete this project?")) return;

    await fetch(`${PROJECT_API}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setLink("");
    setImage(null);
    setPreview(null);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-6">
      <AnimatePresence mode="wait">
        {!token ? (
          /* ================= LOGIN ================= */
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="glass-card neon-purple neon-purple-hover
                       w-full max-w-md p-10 rounded-2xl"
          >
            <h2 className="text-3xl font-black uppercase mb-6 flex items-center gap-2">
              <Lock /> Admin Login
            </h2>

            <input
              className="w-full mb-4 p-3 rounded-xl bg-white/10"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full mb-6 p-3 rounded-xl bg-white/10"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={login}
              className="w-full py-3 rounded-xl border border-primary neon-purple neon-purple-hover"
            >
              Login
            </button>
          </motion.div>
        ) : (
          /* ================= DASHBOARD ================= */
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="glass-card neon-purple neon-purple-hover
                       w-full max-w-6xl p-10 rounded-2xl"
          >
            <div className="flex justify-between mb-10">
              <h1 className="text-4xl font-black uppercase">
                Admin Dashboard
              </h1>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-6 py-3 border border-primary rounded-xl neon-purple neon-purple-hover"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>

            {/* FORM */}
            <div className="glass-card p-6 rounded-xl mb-10">
              <h3 className="text-2xl font-bold mb-4">
                {editingId ? "Edit Project" : "Add Project"}
              </h3>

              <input
                className="w-full mb-3 p-3 rounded-xl bg-white/10"
                placeholder="Project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                className="w-full mb-3 p-3 rounded-xl bg-white/10"
                placeholder="Project link (https://...)"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />

              <textarea
                className="w-full mb-3 p-3 rounded-xl bg-white/10"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <label className="flex items-center gap-2 cursor-pointer mb-4">
                <ImageIcon />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setImage(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
                Upload Image
              </label>

              {preview && (
                <img
                  src={preview}
                  className="w-48 h-32 object-cover rounded-xl mb-4"
                />
              )}

              <button
                onClick={saveProject}
                className="px-6 py-3 border border-primary rounded-xl neon-purple neon-purple-hover"
              >
                <Plus size={16} /> {editingId ? "Update" : "Add"}
              </button>
            </div>

            {/* PROJECT LIST */}
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="glass-card p-6 rounded-xl neon-purple neon-purple-hover"
                >
                  {p.image && (
                    <img
                      src={`${IMAGE_BASE}/${p.image}`}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}

                  <h4 className="text-xl font-bold">{p.title}</h4>
                  <p className="opacity-80 mb-3">{p.description}</p>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline flex items-center gap-1 mb-4"
                  >
                    <LinkIcon size={14} /> Visit Project
                  </a>

                  <div className="flex gap-6">
                    <button
                      onClick={() => editProject(p)}
                      className="text-primary flex items-center gap-1"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="text-red-400 flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
