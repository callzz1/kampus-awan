function Capsule({ text }) {
    const STYLE = `
        text-sm flex justify-center items-center px-2 bg-green-600/20 text-green-600 min-w-8 w-fit h-fit rounded-full
    `

    return (
        <div className={ STYLE }>
            <h5>{ text }</h5>
        </div>
    );
}

export default Capsule;