function Title({ text }: { text: string }) {
    return (
        <div
            className={
                "text-5xl italic transition-all duration-100  rounded-md p-4 font-bold text-current"
            }
        >
            {text}
        </div>
    );
}

export default Title;
