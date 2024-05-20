import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import InputText from "../../components/form/InputText";
import {  RiStickyNoteFill as BookIcon, RiSparkling2Fill as SparkleIcon} from "react-icons/ri";
import Submit from "../../components/form/Submit";
import { backendUrl } from "../../utils/backendUrl";

function Video() {
    const { courseId } = useParams();
    const { videoId } = useParams();

    const [ loading, setLoading ] = useState(false);
    const [ course, setCourse ] = useState({});
    const [ video, setVideo ] = useState({});
    const [ messages, setMessages ] = useState([
        {
            from: "bot",
            value: "Halo! Saya akan membantu semua pertanyaan yang anda butuhkan!"
        }
    ]);

    const chatBox = useRef(null);

    useEffect(() => {
        if(chatBox.current) {
            console.log(chatBox.current.getBoundingClientRect());
        }
        chatBox.current?.scrollIntoView(chatBox.current?.getBoundingClientRect().bottom);
    }, [ messages ]);

    useEffect(() => {
        if(messages.length > 20) {
            setMessages((prev) => {
                return prev.slice(1, messages.length)
            });
        }
    }, [ messages ]);

    useEffect(() => { 
        async function getVideo() {
            try {
                const request = await fetch(`${ backendUrl }/api/videos?id=${ videoId }`);
                const result = await request.json();
        
                setVideo(result);
            } catch(err) {
                console.log("Failed to retreive video");
                throw err;
            }
        }
        getVideo();
    }, [ videoId ]);

    useEffect(() => { 
        async function getVideo() {
            try {
                const request = await fetch(`${ backendUrl }/api/courses?id=${ courseId }`);
                const result = await request.json();
        
                setCourse(result);
            } catch(err) {
                console.log("Failed to retreive courses");
                throw err;
            }
        }
        getVideo();
    }, [ courseId ]);

    async function handleAsk(event) {
        event.preventDefault();

        setLoading(() => true);

        let value = event.target.ask.value;

        setMessages((prev) => {
            return [ ...prev,  {
                from: "user",
                value: value
            }]
        });

        // clear input box
        event.target.ask.value = ""

        try {
            const request = await fetch(`${ backendUrl }/api/ai?chat=${ value }`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const response = await request.json();
            
            setMessages((prev) => {
                return [ ...prev, {
                    from: "bot",
                    value: response.message   
                }]
            });

        } catch(err) {
            console.log(err);
            throw err;
        }

        setLoading(() => false);
        event.target.ask.focus()
    }

    if(Object.keys(course).length > 0) {
        return (
            <>
                <div className="flex gap-2 items-center">
                    <BookIcon className="h-full p-1 w-auto" />
                    <h1 className="text-2xl font-semibold">{ video.title }</h1>
                </div>
                <div className="flex flex-col h-[60vh] small:h-full w-full gap-4">
                    <div className="grid grid-cols-10 small:grid-cols-1 gap-4 w-full h-full">
                        {/* Video section */}
                        <video className="col-span-6 small:col-span-1 w-full object-cover h-full bg-gray-500 flex justify-self-center self-center rounded-xl" controls>
                            <source src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4" type="video/mp4" />
                        </video>

                        {/* Chatbot section */}
                        <div className="col-span-4 small:col-span-1 border border-blue-500 p-4 rounded-xl h-full w-full flex flex-col gap-4 overflow-y-scroll">
                            <div className="flex items-center gap-1">
                                <h3 className="text-2xl font-semibold">Tanya AI</h3>
                                <SparkleIcon className="h-full w-auto p-1 text-blue-500"/>
                            </div>
                            <div ref={ chatBox } className="flex flex-col gap-4 p-2 w-full h-svh rounded-md bg-white/30 overflow-y-scroll">
                                {
                                    messages?.map((message, index) => {
                                        return (
                                            message.from === "user" ? 
                                            <div 
                                                className="w-fit self-end max-w-[80%] p-2 px-4 bg-blue-500 text-white rounded-md"  
                                                key={ index }>
                                                { message.value }
                                            </div> :
                                            <div 
                                                className="w-fit max-w-[80%] p-2 px-4 bg-gray-300 rounded-md"  
                                                key={ index }>
                                                { message.value }
                                            </div>                    
                                        )
                                    })
                                }
                            </div>
                            <form onSubmit={ handleAsk } className="flex flex-1 w-full gap-4">
                                <InputText placeholder="Tanya pertanyaan..." name="ask" loading={ loading }  />
                                <Submit value="Send" loading={ loading } />
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Video;