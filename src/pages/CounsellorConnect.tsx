import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Star, MapPin, Clock, Calendar, CheckCircle,
    MessageSquare, Video, Phone, X, Users, Search, Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { calculateMatchScore } from '../utils/careerUtils';
import { CAREER_DATABASE } from '../utils/careerData';

interface Counsellor {
    id: string;
    name: string;
    title: string;
    field: string;
    fields: string[];
    experience: number;
    rating: number;
    reviews: number;
    location: string;
    avatar: string;
    available: boolean;
    slots: string[];
    mode: ('Video' | 'Phone' | 'Chat')[];
    bio: string;
    specializations: string[];
    fee: number;
}

const COUNSELLORS: Counsellor[] = [
    {
        id: '1', name: 'Dr. Priya Sharma', title: 'Senior Career Counsellor',
        field: 'Technology', fields: ['Technology', 'Software Engineering', 'Data Science', 'AI/ML'],
        experience: 12, rating: 4.9, reviews: 238, location: 'Delhi, India',
        avatar: 'PS', available: true,
        slots: ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'],
        mode: ['Video', 'Phone', 'Chat'],
        bio: 'Ex-Google engineer turned counsellor. Helped 500+ students crack their dream tech careers. Specializes in IIT/NIT placements and startup ecosystem guidance.',
        specializations: ['JEE Guidance', 'Tech Internships', 'CS Career Paths', 'Coding Bootcamps'],
        fee: 499,
    },
    {
        id: '2', name: 'Mr. Arjun Mehta', title: 'Medical & Science Counsellor',
        field: 'Medicine', fields: ['Medicine', 'Biology', 'Healthcare', 'Research'],
        experience: 9, rating: 4.8, reviews: 185, location: 'Mumbai, India',
        avatar: 'AM', available: true,
        slots: ['9:00 AM', '12:00 PM', '3:00 PM', '5:30 PM'],
        mode: ['Video', 'Chat'],
        bio: 'MBBS + MD graduate, now guiding aspiring doctors through NEET preparation, medical college selection, and healthcare specialization choices.',
        specializations: ['NEET Preparation', 'Medical Colleges', 'Medical Research', 'Paramedical Careers'],
        fee: 599,
    },
    {
        id: '3', name: 'Ms. Kavya Nair', title: 'Arts & Design Counsellor',
        field: 'Design', fields: ['Design', 'Arts', 'Creative Industries', 'Architecture', 'Fashion'],
        experience: 7, rating: 4.7, reviews: 142, location: 'Bangalore, India',
        avatar: 'KN', available: false,
        slots: ['11:00 AM', '1:00 PM', '3:30 PM'],
        mode: ['Video', 'Phone'],
        bio: 'NID graduate and practicing UX designer. Helps students discover paths in graphic design, UX/UI, fashion, film, and creative arts with real industry insights.',
        specializations: ['NID/NIFT Prep', 'UX/UI Careers', 'Portfolio Building', 'Creative Startups'],
        fee: 449,
    },
    {
        id: '4', name: 'Mr. Rohit Gupta', title: 'Commerce & Finance Counsellor',
        field: 'Finance', fields: ['Finance', 'Commerce', 'Business', 'Economics', 'Management'],
        experience: 11, rating: 4.8, reviews: 203, location: 'Pune, India',
        avatar: 'RG', available: true,
        slots: ['10:30 AM', '2:30 PM', '4:00 PM', '6:00 PM'],
        mode: ['Video', 'Phone', 'Chat'],
        bio: 'CA + MBA from IIM-A. Expert in guiding students towards CA, CFA, MBA admissions, banking & finance careers, and entrepreneurship.',
        specializations: ['CA/CFA Guidance', 'IIM Admissions', 'Stock Market', 'Finance Startups'],
        fee: 549,
    },
    {
        id: '5', name: 'Dr. Anita Joshi', title: 'Law & Humanities Counsellor',
        field: 'Law', fields: ['Law', 'Humanities', 'Social Sciences', 'Psychology', 'Journalism'],
        experience: 14, rating: 4.9, reviews: 167, location: 'Chennai, India',
        avatar: 'AJ', available: true,
        slots: ['9:30 AM', '11:00 AM', '1:30 PM', '5:00 PM'],
        mode: ['Video', 'Chat'],
        bio: 'Former Supreme Court lawyer and academic with 14 years of career counselling. Guides students towards law, psychology, journalism, civil services, and humanities.',
        specializations: ['CLAT Preparation', 'Civil Services (UPSC)', 'Psychology Careers', 'Journalism & Media'],
        fee: 649,
    },
    {
        id: '6', name: 'Mr. Vivek Singh', title: 'Engineering & Core Sciences',
        field: 'Engineering', fields: ['Engineering', 'Mechanical', 'Civil', 'Electronics', 'Chemical'],
        experience: 10, rating: 4.7, reviews: 156, location: 'Hyderabad, India',
        avatar: 'VS', available: true,
        slots: ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'],
        mode: ['Video', 'Phone'],
        bio: 'IIT Bombay alumnus with experience in core engineering firms. Guides students into mechanical, civil, chemical, and electronics engineering careers and PSU jobs.',
        specializations: ['JEE Advanced', 'Core Engineering Jobs', 'PSU Careers', 'Research & Development'],
        fee: 499,
    },
];

const FIELD_KEYWORDS: Record<string, string[]> = {
    'Technology': ['software', 'tech', 'developer', 'ai', 'data', 'computer', 'coding', 'web', 'cyber', 'cloud'],
    'Medicine': ['doctor', 'medical', 'health', 'medicine', 'nurse', 'pharma', 'biology', 'clinical'],
    'Design': ['design', 'art', 'creative', 'ux', 'ui', 'graphic', 'fashion', 'architecture', 'film'],
    'Finance': ['finance', 'business', 'commerce', 'accounting', 'investment', 'economics', 'management', 'banking'],
    'Law': ['law', 'legal', 'judiciary', 'social', 'psychology', 'journalism', 'humanities', 'civil services'],
    'Engineering': ['engineering', 'mechanical', 'electrical', 'civil', 'chemical', 'electronics'],
};

const modeIcon: Record<string, React.ReactNode> = {
    Video: <Video className="w-3 h-3" />,
    Phone: <Phone className="w-3 h-3" />,
    Chat: <MessageSquare className="w-3 h-3" />,
};

const avatarColors: Record<string, string> = {
    PS: 'from-indigo-500 to-purple-600', AM: 'from-teal-500 to-emerald-600',
    KN: 'from-pink-500 to-rose-600', RG: 'from-amber-500 to-orange-600',
    AJ: 'from-blue-500 to-cyan-600', VS: 'from-emerald-500 to-teal-600',
};

interface BookingModal {
    counsellor: Counsellor;
}

const CounsellorConnect: React.FC = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [search, setSearch] = useState('');
    const [filterField, setFilterField] = useState('All');
    const [booking, setBooking] = useState<BookingModal | null>(null);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedMode, setSelectedMode] = useState('');
    const [bookingDone, setBookingDone] = useState(false);
    const [bookedCounsellor, setBookedCounsellor] = useState('');

    // Detect user's top career field
    const suggestedField = useMemo(() => {
        if (!user?.profile) return null;
        const matches = CAREER_DATABASE
            .map(career => ({ career, score: calculateMatchScore(career, user.profile ?? {}) }))
            .sort((a, b) => b.score - a.score);
        const topTitle = matches[0]?.career?.title?.toLowerCase() ?? '';
        for (const [field, keywords] of Object.entries(FIELD_KEYWORDS)) {
            if (keywords.some(kw => topTitle.includes(kw))) return field;
        }
        return null;
    }, [user?.profile]);

    const allFields = ['All', ...Object.keys(FIELD_KEYWORDS)];

    const filtered = COUNSELLORS.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.field.toLowerCase().includes(search.toLowerCase()) ||
            c.specializations.some(s => s.toLowerCase().includes(search.toLowerCase()));
        const matchField = filterField === 'All' || c.field === filterField;
        return matchSearch && matchField;
    });

    // Sort: suggested field first, then available, then by rating
    const sorted = [...filtered].sort((a, b) => {
        if (suggestedField) {
            const aMatch = a.field === suggestedField ? 1 : 0;
            const bMatch = b.field === suggestedField ? 1 : 0;
            if (bMatch !== aMatch) return bMatch - aMatch;
        }
        if (a.available !== b.available) return a.available ? -1 : 1;
        return b.rating - a.rating;
    });

    const confirmBooking = () => {
        if (!booking || !selectedSlot || !selectedMode) return;
        setBookedCounsellor(booking.counsellor.name);
        setBookingDone(true);
        setBooking(null);
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 lg:p-10 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">Connect with a Counsellor</h1>
                    <p className="text-sm text-slate-500">
                        {suggestedField
                            ? `Based on your profile, we recommend a ${suggestedField} counsellor`
                            : 'Find expert guidance for your career path'}
                    </p>
                </div>
            </div>

            {/* Booking Success Toast */}
            <AnimatePresence>
                {bookingDone && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-2xl p-5"
                    >
                        <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="font-bold text-emerald-800">Appointment Requested! 🎉</p>
                            <p className="text-sm text-emerald-600">Your session with {bookedCounsellor} has been requested. You'll receive a confirmation shortly.</p>
                        </div>
                        <button onClick={() => setBookingDone(false)} className="p-1 hover:bg-emerald-100 rounded-lg">
                            <X className="w-4 h-4 text-emerald-500" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Suggested Banner */}
            {suggestedField && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-indigo-500 to-teal-500 rounded-2xl p-5 text-white flex items-center gap-4"
                >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <p className="font-extrabold text-lg">AI Recommendation 🎯</p>
                        <p className="text-sm text-white/80">
                            Your career analysis suggests <strong>{suggestedField}</strong> as your top match.
                            We've highlighted the best {suggestedField} counsellors for you below.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text" value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name, field, or specialization..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-indigo-400 shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    {allFields.map(f => (
                        <button key={f} onClick={() => setFilterField(f)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${filterField === f ? 'bg-indigo-500 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:border-indigo-300'}`}>
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Counsellor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {sorted.map((c, i) => {
                    const isRecommended = suggestedField && c.field === suggestedField;
                    return (
                        <motion.div key={c.id}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            className={`card p-6 flex flex-col gap-4 relative overflow-hidden ${isRecommended ? 'ring-2 ring-indigo-400 ring-offset-2' : ''}`}
                        >
                            {isRecommended && (
                                <div className="absolute top-3 right-3 bg-gradient-to-r from-indigo-500 to-teal-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
                                    ⭐ Recommended
                                </div>
                            )}

                            {/* Avatar + Name */}
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarColors[c.avatar]} flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0`}>
                                    {c.avatar}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-extrabold text-slate-800 text-sm leading-tight">{c.name}</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">{c.title}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        <span className="text-xs font-bold text-slate-700">{c.rating}</span>
                                        <span className="text-xs text-slate-400">({c.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Info Pills */}
                            <div className="flex flex-wrap gap-2">
                                <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${c.available ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${c.available ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                    {c.available ? 'Available' : 'Busy'}
                                </span>
                                <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-500">
                                    <MapPin className="w-3 h-3" /> {c.location}
                                </span>
                                <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
                                    <Clock className="w-3 h-3" /> {c.experience}y exp
                                </span>
                            </div>

                            {/* Bio */}
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{c.bio}</p>

                            {/* Specializations */}
                            <div className="flex flex-wrap gap-1.5">
                                {c.specializations.slice(0, 3).map(s => (
                                    <span key={s} className="text-[10px] font-bold bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">{s}</span>
                                ))}
                            </div>

                            {/* Mode + Fee */}
                            <div className="flex items-center justify-between">
                                <div className="flex gap-1">
                                    {c.mode.map(m => (
                                        <span key={m} className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
                                            {modeIcon[m]} {m}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-sm font-extrabold text-indigo-600">₹{c.fee}/session</span>
                            </div>

                            {/* Book Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={() => { setBooking({ counsellor: c }); setSelectedSlot(''); setSelectedMode(''); }}
                                disabled={!c.available}
                                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${c.available
                                    ? 'bg-gradient-to-r from-indigo-500 to-teal-500 text-white hover:shadow-lg hover:shadow-indigo-200'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                            >
                                <Calendar className="w-4 h-4" />
                                {c.available ? 'Book Appointment' : 'Currently Unavailable'}
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            {sorted.length === 0 && (
                <div className="card p-16 text-center">
                    <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="font-bold text-slate-400">No counsellors found</h3>
                    <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters.</p>
                </div>
            )}

            {/* Booking Modal */}
            <AnimatePresence>
                {booking && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && setBooking(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
                        >
                            {/* Close */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-extrabold text-slate-800">Book Appointment</h2>
                                <button onClick={() => setBooking(null)} className="p-2 hover:bg-slate-100 rounded-lg">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            {/* Counsellor Info */}
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-6">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${avatarColors[booking.counsellor.avatar]} flex items-center justify-center text-white font-extrabold`}>
                                    {booking.counsellor.avatar}
                                </div>
                                <div>
                                    <p className="font-extrabold text-slate-800 text-sm">{booking.counsellor.name}</p>
                                    <p className="text-xs text-slate-500">{booking.counsellor.title}</p>
                                    <p className="text-xs font-bold text-indigo-600 mt-0.5">₹{booking.counsellor.fee} per session</p>
                                </div>
                            </div>

                            {/* Select Time Slot */}
                            <div className="mb-5">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                                    Select Time Slot (Today)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {booking.counsellor.slots.map(slot => (
                                        <button key={slot} onClick={() => setSelectedSlot(slot)}
                                            className={`py-2.5 px-4 rounded-xl text-sm font-bold border transition-all ${selectedSlot === slot ? 'bg-indigo-500 text-white border-indigo-500' : 'border-slate-200 text-slate-600 hover:border-indigo-300 bg-white'}`}>
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Select Mode */}
                            <div className="mb-6">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                                    Session Mode
                                </label>
                                <div className="flex gap-2">
                                    {booking.counsellor.mode.map(m => (
                                        <button key={m} onClick={() => setSelectedMode(m)}
                                            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${selectedMode === m ? 'bg-teal-500 text-white border-teal-500' : 'border-slate-200 text-slate-600 hover:border-teal-300 bg-white'}`}>
                                            {modeIcon[m]} {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Confirm */}
                            <button
                                onClick={confirmBooking}
                                disabled={!selectedSlot || !selectedMode}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white font-extrabold text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Confirm Appointment
                            </button>
                            <p className="text-center text-xs text-slate-400 mt-3">You'll receive a confirmation email shortly after booking.</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CounsellorConnect;
