import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'

import car from '../assets/car.jpg'
import Bottomcontainer from './Bar'

const toLatLng = (point) => [point.latitude, point.longitude]

const getDirection = (start, end) => {
    const [lat1, lng1] = toLatLng(start)
    const [lat2, lng2] = toLatLng(end)
    const dLng = (lng2 - lng1) * (Math.PI / 180)
    const lat1Rad = lat1 * (Math.PI / 180)
    const lat2Rad = lat2 * (Math.PI / 180)
    const y = Math.sin(dLng) * Math.cos(lat2Rad)
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng)
    let angle = Math.atan2(y, x) * (180 / Math.PI)
    return (angle + 90 + 360) % 360      
}

const carIcon = (angle) => L.divIcon({
    className: 'custom-emoji-icon',
    html: `<div style="font-size: 30px; transform: rotate(${angle}deg); transform-origin: center;">🚗</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
})

export default function MapComponent() {
    const [route, setRoute] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [carSpeed, setCarSpeed] = useState(1)
    const [routeByDay, setRouteByDay] = useState('today')
    const [rotation, setRotation] = useState(0)
  
    
    const handleCarSpeed = (index) => {
        const speedMap = {
            1: 1000,
            2: 700,
            3: 500,
            4: 250,
            5: 100
        }
        return speedMap[index] || 500
    }

    useEffect(() => {
        fetch('dummy-route.json')
            .then(res => res.json())
            .then(data => {setRoute(data.routes[routeByDay])
                setCurrentIndex(0)
            })
    }, [routeByDay])

    useEffect(() => {
        if (route.length === 0 || !isPlaying) return

        const interval = setInterval((i) => {
           setCurrentIndex((i) => {
            if (i >= route.length - 1) return i 

            const next = i + 1
            const angle = getDirection(route[i], route[next])
            setRotation(angle)
            return next 
           })
        }, handleCarSpeed(carSpeed))
        return () => clearInterval(interval)
    }, [route, isPlaying, carSpeed, routeByDay])


    const handleToggle = () => {
        setIsPlaying(prev => !prev)
    }

    const handleReset = () => {
        setCurrentIndex(0)
        setIsPlaying(false)
        setRotation(0)
    }

    if (route.length === 0) return <p>Map Loading....</p>

    const markerPosition = toLatLng(route[currentIndex])
    const polyLinePoints = route.slice(0, currentIndex + 1).map(toLatLng)

    return (
        <div className='relative'>
            <MapContainer center={markerPosition} zoom={15} style={{ height: '100vh', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Polyline positions={route.map(toLatLng)} color='green' />
                <Polyline positions={polyLinePoints} color="blue" />
                <Marker position={markerPosition} icon={carIcon(rotation)} >
                <Popup>
                    <div className='text-center'>
                       <strong>Vechicle Location</strong><br />
                       Progress: {currentIndex + 1} / {route.length}<br /> 
                       Lat: {route[currentIndex].latitude.toFixed(4)}<br /> 
                       Lng: {route[currentIndex].longitude.toFixed(4)}
                    </div>
                </Popup>
                </Marker >
            </MapContainer>
            <Bottomcontainer routeByDay={routeByDay} setRouteByDay={setRouteByDay} carSpeed={carSpeed} setCarSpeed={setCarSpeed} isPlaying={isPlaying} handleReset={handleReset} handleToggle={handleToggle} />
        </div>
    )
}  