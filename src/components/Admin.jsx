import React from 'react'
import "../assets/css/adminPage.css"
export default function Admin() {
  return (
    <div>
        <h1 class="head1">Welcome to the Admin Page</h1>
        <button onClick={() => window.location.href = "/adminvideo"}>Add Video</button>
        <button onClick={() => window.location.href = "/adminimage"}>Add Image</button>
        <button onClick={() => window.location.href = "/adminaudio"}>Add Audio</button>
        <button onClick={() => window.location.href = "/admindocument"}>Add Document</button>
        </div>
  )
}
