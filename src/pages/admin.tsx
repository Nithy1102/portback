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
import { supabase } from "@/lib/supabase"; 

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
  id: string;
  title: string;
  description: string;
  link: string;
  image: string | null;
};

export default function Admin() {
  /* ================= AUTH ================= */
 const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= UI ================= */
  const [loading, setLoading] = useState(true);

  /* ================= PROJECTS ================= */
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
  const getSession = async () => {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    setLoading(false);
  };
  getSession();
}, []);
/* ================= AUTO LOGOUT ON PAGE LEAVE ================= */
useEffect(() => {
  return () => {
    supabase.auth.signOut();
  };
}, []);
  /* ================= LOAD PROJECTS ================= */
 useEffect(() => {
  const loadProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*");

    if (!error && data) setProjects(data);
  };
  loadProjects();
}, [session]);
  /* ================= LOGIN ================= */
  const login = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) alert(error.message);
  else {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
  }
};

  /* ================= LOGOUT ================= */
  const logout = async () => {
  await supabase.auth.signOut();
  setSession(null);
};
  /* ================= ADD / UPDATE ================= */
const saveProject = async () => {
  if (!title || !description || !link) {
    alert("Title, description & link required");
    return;
  }

  let imageUrl = preview;

  if (image) {
    const fileName = `${Date.now()}-${image.name}`;
    const { error } = await supabase.storage
      .from("Portfolio")
      .upload(fileName, image);
    const { data } = supabase.storage
      .from("Portfolio")
      .getPublicUrl(fileName);
    console.log("UPLOAD RESULT:", data, error);

if (error) {
  alert(error.message);
  return;
}

    imageUrl = data.publicUrl;
  }

  const payload = { title, description, link, image: imageUrl };
  
  if (editingId) {
    const { data, error } = await supabase
  .from("projects")
  .update(payload)
  .eq("id", editingId)
  .select();

console.log("UPDATE RESULT:", data, error);
  } else {
    const { error } = await supabase.from("projects").insert(payload);
console.log(error);
  }

  resetForm();
  const { data } = await supabase.from("projects").select("*");
  setProjects(data || []);
};
  const editProject = (p: Project) => {
    setEditingId(p.id);
    setTitle(p.title);
    setDescription(p.description);
    setLink(p.link);
    setPreview(p.image ?? null);
    setImage(null);
  };


  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;

    await supabase.from("projects").delete().eq("id", id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };


  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setLink("");
    setImage(null);
    setPreview(null);
  };


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
        {!session ? (
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
                       w-full max-w-6xl p-10 rounded-2xl mt-24"
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
                      src={p.image}
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
