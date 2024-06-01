import * as React from "react";
import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";

type Props = {
    children: number;
};

const FlipCardComponent: React.FC<Props> = ({ children }) => {
    const [currentNumber, setCurrentNumber] = React.useState(0);
    const previousNumber = usePrevious(currentNumber);

    React.useEffect(() => {
        setCurrentNumber(children);
    }, [children]);

    const frontCardAnimation = useSpring({
        from: { transform: "rotateX(0deg)" },
        to: { transform: "rotateX(-180deg)" },
        delay: 0,
        config: config.slow,
        reset: true,
    });

    const backCardAnimation = useSpring({
        from: { transform: "rotateX(180deg)" },
        to: { transform: "rotateX(0deg)" },
        delay: 0,
        config: config.slow,
        reset: true,
    });

    return (
        <Container>
            <StaticCardTop>
                <span className="countdown">{currentNumber}</span>
            </StaticCardTop>
            <StaticCardBottom>
                <span className="countdown">{previousNumber}</span>
            </StaticCardBottom>

            <AnimatedCardFront style={frontCardAnimation}>
                <span className="countdown">{previousNumber}</span>
            </AnimatedCardFront>
            <AnimatedCardBack style={backCardAnimation}>
                <span className="countdown">{currentNumber}</span>
            </AnimatedCardBack>
        </Container>
    );
};

const usePrevious = (currentValue: number) => {
    const previousValue = React.useRef(0);
    React.useEffect(() => {
        previousValue.current = currentValue;
    }, [currentValue]);
    return previousValue.current;
};

const Container = styled("div")`
    display: grid;
    position: relative;
    grid-template-columns: 100%;
    grid-template-rows: 50px 50px;
    grid-template-areas: "top" "bottom";
    width: 80%;
    min-width: 60px;
    height: 100px;
    perspective-origin: 50% 50%;
    perspective: 300px;
    background-color: white;
`;

const StaticCardTop = styled("div")`
    display: flex;
    position: relative;
    justify-content: center;

    width: 100%;
    height: 100%;
    grid-area: top;
    overflow: hidden;
    border: 1px solid gray;
    background-color: white;

    span {
        font-size: 3rem;
        transform: translateY(25%);
    }
`;

const StaticCardBottom = styled("div")`
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;
    height: 100%;
    grid-area: bottom;
    overflow: hidden;
    border: 1px solid gray;
    background-color: white;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    span {
        font-size: 3rem;
        transform: translateY(-75%);
    }
`;

const AnimatedCardFront = styled(animated.div)`
    display: flex;
    position: absolute;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: white;
    width: 100%;
    height: 50px;
    overflow: hidden;
    transform-origin: center bottom;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transform: rotateX(0deg);
    border: 1px solid gray;
    background-color: white;

    span {
        font-size: 3rem;
        transform: translateY(25%);
    }
`;

const AnimatedCardBack = styled(animated.div)`
    display: flex;
    position: absolute;
    justify-content: center;
    top: 50px;
    left: 0;
    background-color: white;
    width: 100%;
    height: 50px;
    overflow: hidden;
    transform: rotateX(180deg);
    transform-origin: center top;
    backface-visibility: hidden;
    border: 1px solid gray;
    background-color: white;

    span {
        font-size: 3rem;
        transform: translateY(-75%);
    }
`;

export const FlipCard = React.memo(FlipCardComponent);
