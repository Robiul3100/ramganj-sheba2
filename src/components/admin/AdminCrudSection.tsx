import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Trash2, Edit2, X, Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ColumnConfig {
  key: string;
  label: string;
  type?: "text" | "textarea" | "boolean" | "select" | "date" | "number";
  options?: string[];
  required?: boolean;
}

interface AdminCrudSectionProps {
  table: string;
  title: string;
  columns: ColumnConfig[];
  color?: string;
}

const AdminCrudSection = ({ table, title, columns, color = "primary" }: AdminCrudSectionProps) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from(table as any).select("*").order("created_at", { ascending: false }).limit(100);
    setItems(data ?? []);
    setLoading(false);
  }, [table]);

  useEffect(() => {
    fetchItems();

    // Realtime subscription
    const channel = supabase
      .channel(`admin-${table}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => {
        fetchItems();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [table, fetchItems]);

  const resetForm = () => {
    setFormData({});
    setShowForm(false);
    setEditingId(null);
  };

  const openAdd = () => {
    setFormData({});
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (item: any) => {
    const data: Record<string, any> = {};
    columns.forEach((col) => { data[col.key] = item[col.key] ?? ""; });
    setFormData(data);
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        const { error } = await supabase.from(table as any).update(formData as any).eq("id", editingId);
        if (error) throw error;
        toast.success("আপডেট হয়েছে!");
      } else {
        const { error } = await supabase.from(table as any).insert(formData as any);
        if (error) throw error;
        toast.success("যোগ করা হয়েছে!");
      }
      resetForm();
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || "ত্রুটি হয়েছে");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত?")) return;
    const { error } = await supabase.from(table as any).delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("মুছে ফেলা হয়েছে!"); fetchItems(); }
  };

  const toggleBoolean = async (id: string, key: string, val: boolean) => {
    await supabase.from(table as any).update({ [key]: !val } as any).eq("id", id);
    fetchItems();
  };

  const textColumns = columns.filter((c) => c.type !== "boolean");
  const filtered = items.filter((item) =>
    textColumns.some((col) => String(item[col.key] ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <p className="text-xs text-muted-foreground">মোট: {filtered.length} টি</p>
        </div>
        <Button onClick={openAdd} size="sm" className="gap-1.5 rounded-xl">
          <Plus className="w-4 h-4" /> নতুন যোগ করুন
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="খুঁজুন..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="pl-10 rounded-xl"
        />
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={resetForm} />
          <div className="relative bg-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-primary rounded-t-2xl p-4 flex items-center justify-between">
              <h3 className="text-base font-bold text-primary-foreground">
                {editingId ? "এডিট করুন" : "নতুন যোগ করুন"}
              </h3>
              <button onClick={resetForm} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <X className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {columns.map((col) => (
                <div key={col.key}>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">{col.label}</label>
                  {col.type === "textarea" ? (
                    <Textarea
                      value={formData[col.key] ?? ""}
                      onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                      className="rounded-xl bg-secondary/50"
                      rows={3}
                    />
                  ) : col.type === "select" ? (
                    <select
                      value={formData[col.key] ?? ""}
                      onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                      className="w-full rounded-xl border border-input bg-secondary/50 px-3 py-2.5 text-sm"
                    >
                      <option value="">বাছাই করুন</option>
                      {col.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : col.type === "boolean" ? (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, [col.key]: !formData[col.key] })}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        formData[col.key] ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {formData[col.key] ? "✅ হ্যাঁ" : "❌ না"}
                    </button>
                  ) : (
                    <Input
                      type={col.type === "date" ? "date" : col.type === "number" ? "number" : "text"}
                      value={formData[col.key] ?? ""}
                      onChange={(e) => setFormData({ ...formData, [col.key]: col.type === "number" ? Number(e.target.value) : e.target.value })}
                      className="rounded-xl bg-secondary/50"
                    />
                  )}
                </div>
              ))}
              <Button onClick={handleSave} className="w-full rounded-xl py-3 text-base gap-2">
                <Check className="w-4 h-4" />
                {editingId ? "আপডেট করুন" : "জমা দিন"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Items List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">কোনো ডাটা নেই</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={item.id} className="bg-card rounded-xl p-4 service-card-shadow hover:service-card-shadow-hover transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-1">
                  {textColumns.map((col) => (
                    <p key={col.key} className="text-sm truncate">
                      <span className="text-muted-foreground text-xs">{col.label}: </span>
                      <span className="font-medium">{String(item[col.key] ?? "—")}</span>
                    </p>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => openEdit(item)} className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                    <Edit2 className="w-3.5 h-3.5 text-primary" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center hover:bg-destructive/20 transition-colors">
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </div>
              </div>
              {/* Boolean toggles */}
              {columns.filter((c) => c.type === "boolean").length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {columns.filter((c) => c.type === "boolean").map((col) => (
                    <button
                      key={col.key}
                      onClick={() => toggleBoolean(item.id, col.key, item[col.key])}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        item[col.key] 
                          ? "bg-green-100 text-green-700 hover:bg-green-200" 
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      }`}
                    >
                      {item[col.key] ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {col.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCrudSection;
