function Group({ children }: { children: React.ReactNode }) {
    return <div className={"flex flex-row items-center gap-3"}>{children}</div>;
}

export default Group;
