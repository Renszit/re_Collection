import { useSelector } from "react-redux";

export default function UserSelection() {
    const result = useSelector(
        (state) => state.selectedRecord && state.selectedRecord
    );

    return (
        <div>
            {result && (
                <div>
                    {result.name && <h1>{result.name}</h1>}
                    {result.profile && <p>{result.profile}</p>}
                    {result.title && <h1>{result.title}</h1>}
                    {result.artists && <p>{result.artists[0].name}</p>}
                </div>
            )}
        </div>
    );
}
