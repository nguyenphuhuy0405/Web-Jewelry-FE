export const SearchIcon = ({ height = '30px', width = '30px', className }) => {
    return (
        <svg
            className={className}
            height={height}
            width={width}
            viewBox="0 0 30 30"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <title>Search</title>
            <g
                stroke="none"
                strokeWidth="1.5"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <g transform="translate(-1335.000000, -30.000000)" stroke="currentColor">
                    <g transform="translate(1336.000000, 31.000000)">
                        <circle cx="12" cy="12" r="12"></circle>
                        <line x1="27" y1="27" x2="20.475" y2="20.475" id="Path"></line>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export const CartIcon = ({ height = '40px', width = '40px', className }) => {
    return (
        <svg
            className={className}
            height={height}
            width={width}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
        >
            <title>Basket</title>
            <path
                d="M68.4 192A20.38 20.38 0 0048 212.2a17.87 17.87 0 00.8 5.5L100.5 400a40.46 40.46 0 0039.1 29.5h232.8a40.88 40.88 0 0039.3-29.5l51.7-182.3.6-5.5a20.38 20.38 0 00-20.4-20.2H68"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="20"
            ></path>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="20"
                d="M160 192l96-128 96 128"
            ></path>
        </svg>
    )
}
