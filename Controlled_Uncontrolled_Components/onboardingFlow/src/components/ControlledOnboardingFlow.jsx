import React from 'react'

const ControlledOnboardingFlow = ({
    children, 
    onFinish,
    currentIndex,
    onNext,
}) => {

    const goToNext = stepData => {
        if(currentIndex === React.Children.toArray(children).length - 1){
            onFinish(stepData);
            return;
        }
        onNext(stepData);
    }

    const currentChild = React.Children.toArray(children)[currentIndex];
    if(React.isValidElement(currentChild)){
        return React.cloneElement(currentChild, {goToNext})
    }

    return currentChild;
}

export default ControlledOnboardingFlow