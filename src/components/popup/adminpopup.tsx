import { PropsWithChildren } from "react";

type PopupProps = {
    togglePopup: (event: React.MouseEvent<HTMLElement>) => void;
}

export const AdminPopup = ({ togglePopup, children }: PropsWithChildren & PopupProps) => {
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-black bg-opacity-75">
            <div className="w-600 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10">
                <div className="absolute top-0 right-0 p-1 bg-red-600 cursor-pointer text-white" onClick={togglePopup}>x</div>
                {children}
            </div>
        </div>
    );
}