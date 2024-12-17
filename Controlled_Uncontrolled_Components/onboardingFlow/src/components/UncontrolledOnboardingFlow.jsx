import React, { useState } from 'react'

const UncontrolledOnboardingFlow = ({children, onFinish}) => {
    const [onboardingData, setOnboardingData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = stepData => {
        const nextIndex = currentIndex + 1;
        // Merge the step data with the existing onboarding data 
        const updatedData = {
            ...onboardingData,
            ...stepData
        };

        // If we are at the end of the onboarding flow, call onFinish
        if(nextIndex >= React.Children.count(children)){
            onFinish(updatedData);
        } else {
            setCurrentIndex(nextIndex);
        }
        // Update the onboarding data
        setOnboardingData(updatedData);
    };

    const currentChild = React.Children.toArray(children)[currentIndex];
    if(React.isValidElement(currentChild)){
        return React.cloneElement(currentChild, {goToNext})
    }

    return currentChild;
}

export default UncontrolledOnboardingFlow