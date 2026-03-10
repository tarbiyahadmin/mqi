import {
  BookOpen,
  GraduationCap,
  Sun,
  Users,
  Award,
  Heart,
  Clock,
  Shield,
  Briefcase,
  BookMarked,
  Library,
  School,
  Calendar,
  Sparkles,
  Palette,
  Globe,
  Target,
  MapPin,
  DollarSign,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  Sun,
  Users,
  Award,
  Heart,
  Clock,
  Shield,
  Briefcase,
  BookMarked,
  Library,
  School,
  Calendar,
  Sparkles,
  Palette,
  Globe,
  Target,
  MapPin,
  DollarSign,
};

export function getIcon(name: string | undefined): LucideIcon {
  if (!name) return BookOpen;
  return iconMap[name] ?? BookOpen;
}
