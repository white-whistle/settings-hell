import FullScreenContainer from "../components/FullScreenContainer";

function Route404() {
    return (
        <FullScreenContainer>
            <div className={"text-2xl text-black bg-white"}>
                OOps! the page you are looking for could not be found!
            </div>
        </FullScreenContainer>
    );
}

export default Route404;
