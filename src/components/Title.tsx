function Title({ text }: { text: string }) {
    return (
        <div
            className={
                "text-3xl italic text-slate-200 transition-all duration-100  rounded-md p-4 font-bold"
            }
        >
            {text}
        </div>
    );
}

export default Title;
