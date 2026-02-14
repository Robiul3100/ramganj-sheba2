import { Clock } from "lucide-react";
import { Service } from "@/data/services";

interface ComingSoonModalProps {
  service: Service;
  onClose: () => void;
}

const ComingSoonModal = ({ service, onClose }: ComingSoonModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30" />
      <div
        className="relative bg-card rounded-lg p-8 max-w-sm w-full text-center service-card-shadow"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-foreground mb-4">শীঘ্রই আসছে!</h3>
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Clock className="w-7 h-7 text-accent" />
        </div>
        <h4 className="text-lg font-bold text-foreground mb-2">{service.title}</h4>
        <p className="text-sm text-muted-foreground mb-6">
          সেবাটি নিয়ে আমাদের কাজ চলছে। খুব শীঘ্রই এটি অ্যাপে যুক্ত করা হবে।
        </p>
        <button
          onClick={onClose}
          className="bg-accent text-accent-foreground font-semibold px-6 py-2.5 rounded-lg"
        >
          অপেক্ষা করুন
        </button>
      </div>
    </div>
  );
};

export default ComingSoonModal;
