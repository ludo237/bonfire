export function useConfirmAction() {
    const confirm = (message: string, action: () => void) => {
        if (window.confirm(message)) {
            action();
        }
    };

    return { confirm };
}
