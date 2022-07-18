const navbarWrapper = document.querySelector('.nav-tools')
const popupWrappers = document.querySelectorAll('.popup-wrapper')

const popupWrapperFromId = (id) => document.querySelector(`[data-popup-wrapper="${id}"]`)

const searchChannelPopupContent = document.querySelector('.search-channel-popup-content')
const searchChannelPopup = document.querySelector('.search-channel-popup')

const channelInformationWrapper = document.querySelector('.channel-information')

const ulChannelData = document.querySelector('.ul-channel-data')
const userImage = document.querySelector('.user-channel-image')

const channelData = {
    channelId: '',
    setChannelValue: function(newId) {
        return this.channelId = newId
    }
}

navbarWrapper.addEventListener('click', event => {
    
    const { tool } = event.target.dataset
    
    const { popup } = searchChannelPopupContent.dataset
    
    const popupWrapper = popupWrapperFromId(popup)

    switch(tool) {
        case 'search-channel':
            searchChannelPopupContent.setAttribute('style', 
                `display: flex; top: ${event.clientY}px; left: ${event.clientX}px`)
            popupWrapper.style.display = 'block'
            break
    }
})


popupWrappers.forEach(popup => {

    popup.addEventListener('click', async event => {
        const popupId = event.target.dataset.popupWrapper
        const popupWrapper = popupWrapperFromId(popupId)
        popupWrapper?.removeAttribute('style')
        
        if(event.target.dataset.tool === 'search-button') {
            const popupWrapper = popupWrapperFromId(event.target.dataset.popup)
            popupWrapper?.removeAttribute('style')

            channelData.setChannelValue(searchChannelPopup.value)
            const dataToJSON = JSON.stringify(channelData)
            console.log(dataToJSON)

            const xhr = new XMLHttpRequest()
            xhr.open('POST', `/${searchChannelPopup.value}`)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(dataToJSON)
            

            // const data = await fetchChannelDetails(searchChannelPopup.value)
            // console.log(data)
            
            // const { snippet, snippet: { title }, statistics } = data.items[0]

            // const { thumbnails: { ['default']: defaultIcon, ['medium']: mediumIcon, high } } = snippet
        
            // userImage.setAttribute('src', mediumIcon.url)

            // console.log(statistics)

            // const ulChildren = [...ulChannelData.children]
            // ulChildren.forEach(item => item.remove())
            
            // const channelName = document.createElement('li')
            // channelName.innerHTML = `- Nome do canal: <strong>${snippet.title}</strong>`

            // const channelTotalViews = document.createElement('li')
            // channelTotalViews.innerHTML = `- Total de visualizações: ${Number(statistics.viewCount).toLocaleString('pt-BR', { style: 'decimal' })}`

            // const channelTotalVideos = document.createElement('li')
            // channelTotalVideos.innerHTML = `- Total de vídeos: ${statistics.videoCount}`

            // const hiddenSubscribers = !statistics.hiddenSubscriberCount
            //     ? '<span style="color: #3ebb00; font-weight: bold;">PÚBLICA</span>'
            //     : '<span style="color: #ff0000; font-weight: bold">DESATIVADA</span>'

            // const subscriberCount = document.createElement('li')
            // subscriberCount.innerHTML = `- A contagem de inscritos está ${hiddenSubscribers}`

            // const formatedSubscribers = Number.parseInt(statistics.subscriberCount).toLocaleString('pt-BR', { style: 'decimal' })

            // const totalSubscribers = document.createElement('li')
            // totalSubscribers.innerHTML = `- Total de inscritos: ${statistics.hiddenSubscriberCount === false ? formatedSubscribers : '<span style="color: #ff0000; font-weight: bold">ERROR</span>' }`

            // const itemsToAdd = [channelName, channelTotalViews, channelTotalVideos, subscriberCount, totalSubscribers]
            
            // itemsToAdd.forEach(item => ulChannelData.append(item))

            // console.log(statistics)
        }
    })
})