export const Todolist = (props) => {
    return (
        <li
            className="list-group-item d-flex justify-content-between"
            onMouseEnter={props.onHover}
            onMouseLeave={props.onLeave}
        >
            <p className="my-auto py-1 overflow-y-auto" style={{maxWidth:"200px", minWidth: "0px",maxHeight:"60px"}}>{props.name}</p>
            <div className="my-auto">
                <button
                    className={`${props.hoveredIndex === props.index ? "" : "d-none"} bnt border-0 mx-1 py-auto`}
                    onClick={props.delete}
                >
                    <i
                        className={`fa-solid fa-circle-xmark py-0 px-2 text-danger`}
                    >
                    </i>
                </button>
                <button
                    className={`${props.hoveredIndex === props.index ? "" : "d-none"} bnt border-0 mx-1 py-auto`}
                    onClick={props.complete}
                >
                    <i
                        className={`fa-solid fa-circle-check py-0 px-2 text-danger`}
                    >

                    </i>
                </button>
            </div>
        </li>
    );
};