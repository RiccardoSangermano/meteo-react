import React from 'react'

function Footer() {
  return <footer className='text-center ' style={{
    backgroundColor: '#4B0082',
    color: 'white',
    borderTop: '1px solidrgba(182, 1, 210, 0.4)', 
    fontSize: '1.2em', 
  }}>&copy; {new Date().getFullYear()} Epicode Meteo</footer>;

}

export default Footer