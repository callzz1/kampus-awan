function Box({ children, ...props}) {
    const STYLE =`
        flex flex-col gap-4 p-4 rounded-xl bg-gradient-to-br from-white/30 via-gray-200/50 to-white/30 border border-black/15 drop-shadow-sm shadow-xl shadow-black/10
        w-full h-auto
    `

    return (
        <div className={ STYLE} { ...props }>
            { children }
        </div>
    )
}

export default Box;

