import CinematicPlayer from './CinematicPlayer';

const VideoPlayer = ({ videoUrl, title, aspect_ratio = '16/9', initialFullscreen }) => {
    // Get the correct Tailwind aspect ratio class
    const getAspectRatioClass = (ratio) => {
        switch (ratio) {
            case '9/16': return 'aspect-[9/16]';
            case '21/9': return 'aspect-[21/9]';
            case '1/1': return 'aspect-square';
            case '4/3': return 'aspect-[4/3]';
            default: return 'aspect-video'; // 16/9
        }
    };

    if (!videoUrl) {
        return (
            <div className={`w-full ${getAspectRatioClass(aspect_ratio)} bg-gray-900 flex items-center justify-center text-gray-500`}>
                No video URL provided
            </div>
        );
    }

    return (
        <div className={`relative w-full ${getAspectRatioClass(aspect_ratio)} bg-black overflow-hidden group rounded-[2rem]`}>
            <CinematicPlayer
                videoUrl={videoUrl}
                title={title || "Cinematic Transmission"}
                initialFullscreen={initialFullscreen}
            />
        </div>
    );
};

export default VideoPlayer;
