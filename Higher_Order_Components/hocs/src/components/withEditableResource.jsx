import React, {useState, useEffect} from 'react'
import axios from 'axios'

function capitalizeFirstLetter(str) {
    if (!str) return str;
    return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}


const withEditableResource = (Component, resourcePath, resourceName) => {
  return (props) => {
    const { resourceId } = props
    const [originalData, setOriginalData] = useState(null)
    const [data, setData] = useState(null)

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/api${resourcePath}/${resourceId}`)
        setOriginalData(response.data)
        setData(response.data)
      })(); // IIFE: Immediately Invoked Function Expression
    }, [])

    const onChangeData = changes => {
        setData({...data, ...changes})
        // this combines the original Data data with the changes
        // first the original Data data is spread into a new object
        // then the changes are made to that object
    }

    const onSaveData = async () => {
        const response = await axios.post(`/api${resourcePath}/${resourceId}`, {[resourceName]: data})
        setOriginalData(response.data);
        setData(response.data);
    }

    const onResetData = () => {
        setData(originalData);
    }

    const resourceProps = {
        [resourceName]: data,
        [`onChange${capitalizeFirstLetter(resourceName)}`]: onChangeData,
        [`onSave${capitalizeFirstLetter(resourceName)}`]: onSaveData,
        [`onReset${capitalizeFirstLetter(resourceName)}`]: onResetData,
    }

    return  <Component 
                {...props} 
                {...resourceProps}
            />
  }
}

export default withEditableResource