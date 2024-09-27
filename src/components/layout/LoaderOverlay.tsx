import styled from "styled-components";

// This loader was proudly borrowed from https://cssloaders.github.io/
export const LoaderOverlay = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transform: translateZ(1px);
  backdrop-filter: blur(3px);

  &:after {
    content: "$";
    display: inline-block;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    font-size: 32px;
    font-weight: bold;
    background: #ffd700;
    color: #daa520;
    border: 4px double;
    box-sizing: border-box;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
    animation: coin-flip 4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  @keyframes coin-flip {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
`;
