import React from "preact/compat";

function FullScreenContainer({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={
                "flex flex-col justify-center items-center top-0 lef-0 w-svw h-svh"
            }
        >
            {children}
        </div>
    );
}

export default FullScreenContainer;
