const VignetteQuestion = ({ number, img }) => {
    return (
        <div>
            <p> {number}</p>
            <img src={img} alt={`Vignette ${number}`} />
        </div>
    )
};

export default VignetteQuestion;