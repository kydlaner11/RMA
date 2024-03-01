import { TourProvider as Provider } from "@reactour/tour";
import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleMotion } from "../redux/actions/appAction";

const TourProvider = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <Provider
      startAt={0}
      disableInteraction
      disableKeyboardNavigation={["esc"]}
      afterOpen={() => {
        dispatch(toggleMotion(false));
      }}
      beforeClose={() => {
        dispatch(toggleMotion(true));
      }}
      styles={{
        popover: (base) => ({
          ...base,
          padding: "30px 15px 15px 15px",
          borderRadius: 6,
          fontFamily: "Poppins",
        }),
        close: (base) => ({ ...base, left: "auto", right: 10, top: 10 }),
        maskArea: (base) => ({ ...base, rx: 6 }),
      }}
      scrollSmooth
      showBadge={false}
      onClickClose={({ setIsOpen }) => {
        localStorage.setItem("tour", "true");
        setIsOpen(false);
      }}
      prevButton={({ currentStep, setCurrentStep, steps }) => {
        const first = currentStep === 0;
        return (
          <Button
            type="default"
            onClick={() => {
              if (first) {
                setCurrentStep(() => steps.length - 1);
              } else {
                setCurrentStep((s) => s - 1);
              }
            }}
            size="small"
            style={{
              display: first ? "none" : "block",
            }}
          >
            Previous
          </Button>
        );
      }}
      nextButton={({
        currentStep,
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        const last = currentStep === stepsLength - 1;
        return (
          <Button
            type="primary"
            size="small"
            onClick={() => {
              if (last) {
                localStorage.setItem("tour", "true");
                setIsOpen(false);
              } else {
                setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
              }
            }}
          >
            {last ? "Finish" : "Next"}
          </Button>
        );
      }}
    >
      {children}
    </Provider>
  );
};

export default TourProvider;
