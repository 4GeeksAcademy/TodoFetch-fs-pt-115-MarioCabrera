export const DoneTasks = (props) => {
    return (
        <>
            <li
                className="list-group-item d-flex justify-content-between bg-success text-white"
            >
                <p className="my-auto overflow-y-auto" style={{maxWidth:"200px",maxHeight:"50px"}}>{props.name}</p>
                <button
                    className={`bnt border-0 mx-1 my-auto`}
                >
                    <i
                        className={`fa-solid fa-circle-check py-0 px-2 text-success`}
                    >

                    </i>
                </button>
            </li>
        </>
    )
}