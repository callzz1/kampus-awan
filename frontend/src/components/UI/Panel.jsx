function Panel({ width, overflow = 'overflow-visible', children, ...props}) {
    const STYLE =`
        flex flex-col min-h-full gap-8 rounded-xl p-4 bg-gradient-to-br from-white/30 via-gray-200/50 to-white/30 border border-black/15 drop-shadow-sm shadow-xl shadow-black/10
        ${ width } small:w-full medium:w-full
        ${ overflow }
    `

    return (
        <div className={ STYLE} { ...props }>
            { children }
        </div>
    )
}

export default Panel;

