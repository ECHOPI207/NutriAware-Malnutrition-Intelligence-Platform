import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { MessagingService, Message, Conversation } from '@/services/messaging';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

interface ChatWindowProps {
    conversationId?: string; // Optional: If not provided, fetch current user's active one
    embedded?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversationId: conversationIdProp, embedded = false }) => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversationId, setConversationId] = useState<string | null>(conversationIdProp || null);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user) return;

        const initChat = async () => {
            try {
                let cid = conversationId;

                // If no ID provided, get the user's default conversation
                if (!cid) {
                    const conv = await MessagingService.getUserConversation(user.id);
                    cid = conv.id;
                    setConversationId(cid);
                }

                if (cid) {
                    // Load history
                    const msgs = await MessagingService.getMessages(cid);
                    setMessages(msgs || []);

                    // Subscribe to real-time updates
                    const sub = MessagingService.subscribeToMessages(cid, (payload) => {
                        setMessages((prev) => [...prev, payload.new as Message]);
                    });

                    return () => {
                        sub.unsubscribe();
                    };
                }
            } catch (error) {
                console.error("Failed to load chat", error);
            } finally {
                setLoading(false);
            }
        };

        initChat();
    }, [user, conversationIdProp]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim() || !conversationId || !user) return;

        const text = inputText;
        setInputText(''); // Optimistic clear

        try {
            await MessagingService.sendMessage(conversationId, user.id, text);
        } catch (error) {
            console.error("Failed to send", error);
            setInputText(text); // Restore on failure
        }
    };

    if (loading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className={`flex flex-col ${embedded ? 'h-[500px]' : 'h-full'} border rounded-lg bg-background shadow-sm`}>
            <div className="p-4 border-b bg-muted/30">
                <h3 className="font-semibold flex items-center gap-2">
                    {t('contact.liveSupport')}
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                </h3>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                            {t('contact.startConversation')}
                        </div>
                    )}
                    {messages.map((msg) => {
                        const isMe = msg.sender_id === user?.id;
                        return (
                            <div
                                key={msg.id}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg px-4 py-2 ${isMe
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted'
                                        }`}
                                >
                                    <p className="text-sm">{msg.content}</p>
                                    <p className="text-[10px] opacity-70 mt-1">
                                        {format(new Date(msg.created_at), 'hh:mm a')}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t('contact.typeMessage')}
                    className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!inputText.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
};

export default ChatWindow;
