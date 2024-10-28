import { getSession } from "next-auth/react";
import User from "../../models/User";

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ error: "Not authenticated" });

    switch (req.method) {
        case 'POST':
            try {
                const { message, conversationId } = req.body;
                const user = await User.findOne({ email: session.user.email });

                if (!conversationId) {
                    // สร้าง conversation ใหม่
                    user.conversations.push({
                        title: message.substring(0, 30) + "...",
                        messages: [{ role: 'user', content: message }]
                    });
                } else {
                    // เพิ่มข้อความในการสนทนาที่มีอยู่
                    const conversation = user.conversations.id(conversationId);
                    conversation.messages.push({ role: 'user', content: message });
                    conversation.lastMessage = new Date();
                }

                await user.save();
                res.status(200).json({ success: true });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        case 'GET':
            try {
                const user = await User.findOne({ email: session.user.email });
                res.status(200).json({ conversations: user.conversations });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            break;

        default:
            res.status(405).json({ error: "Method not allowed" });
    }
}