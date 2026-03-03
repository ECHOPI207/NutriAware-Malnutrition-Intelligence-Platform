import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/firebase-auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc } from 'firebase/firestore';

export interface DailyProtocolChecklist {
    water_goal_met: boolean;
    macros_met: boolean;
    supplements_taken: boolean;
    exercise_completed: boolean;
}

export interface UserProtocol {
    currentPhase: number;
    phaseName: string;
    startDate: any;
    lastAdherenceDate: string;
    adherenceScore: number;
    dailyLogs: Record<string, DailyProtocolChecklist>; // Keyed by YYYY-MM-DD
}

const DEFAULT_PROTOCOL: UserProtocol = {
    currentPhase: 1,
    phaseName: 'المرحلة التمهيدية', // "Preparatory Phase"
    startDate: null,
    lastAdherenceDate: '',
    adherenceScore: 0,
    dailyLogs: {}
};

export const useProtocol = () => {
    const { user } = useAuth();
    const [protocol, setProtocol] = useState<UserProtocol | null>(null);
    const [loading, setLoading] = useState(true);

    const getTodayString = () => new Date().toISOString().split('T')[0];

    useEffect(() => {
        const fetchProtocol = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const docRef = doc(db, 'user_protocols', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProtocol(docSnap.data() as UserProtocol);
                } else {
                    // Initialize default protocol for new users
                    const initialProtocol = {
                        ...DEFAULT_PROTOCOL,
                        startDate: serverTimestamp()
                    };
                    await setDoc(docRef, initialProtocol);
                    setProtocol(initialProtocol as unknown as UserProtocol);
                }
            } catch (error) {
                console.error("Failed to fetch user protocol", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProtocol();
    }, [user]);

    const updateDailyChecklist = async (updates: Partial<DailyProtocolChecklist>) => {
        if (!user || !protocol) return;

        const today = getTodayString();
        const currentLog = protocol.dailyLogs[today] || {
            water_goal_met: false,
            macros_met: false,
            supplements_taken: false,
            exercise_completed: false
        };

        const updatedLog = { ...currentLog, ...updates };

        // Optimistic UI update
        const newProtocolState = {
            ...protocol,
            dailyLogs: {
                ...protocol.dailyLogs,
                [today]: updatedLog
            }
        };
        setProtocol(newProtocolState);

        try {
            const docRef = doc(db, 'user_protocols', user.uid);
            await updateDoc(docRef, {
                [`dailyLogs.${today}`]: updatedLog,
                lastAdherenceDate: today
            });
        } catch (error) {
            console.error("Failed to update daily checklist", error);
            // Revert on failure
            setProtocol(protocol);
        }
    };

    return {
        protocol,
        loading,
        updateDailyChecklist,
        todayLog: protocol ? (protocol.dailyLogs[getTodayString()] || null) : null
    };
};
