import { useState } from 'react';

export function useOrganizationMessages(initialMessages: Message[]) {
    const [messages] = useState<Message[]>(initialMessages);

    // TODO: Connect to organization.{id} Reverb channel for real-time updates
    // useEcho(`organization.${organizationId}`, 'MessageSent', (event) => {
    //     setMessages((prev) => [newMessage, ...prev].slice(0, 10));
    // });

    return messages;
}
