import { useParams } from "react-router-dom";

const AdminMusicianDelete = () => {
    const { musicianId } = useParams();
    return (
        <div>{musicianId}</div>
    )
}

export default AdminMusicianDelete