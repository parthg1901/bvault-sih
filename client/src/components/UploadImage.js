import { createHelia } from 'helia'
import { strings } from '@helia/strings'
import { React, useState, useEffect } from 'react'

const UploadImage = () => {
  const [id, setId] = useState(null)
  const [helia, setHelia] = useState(null)
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    const init = async () => {
      if (helia) return

      const heliaNode = await createHelia()
      const s = strings(heliaNode)
      const myImmutableAddress = await s.add('hello world')
      console.log(await s.get(myImmutableAddress))
      console.log(myImmutableAddress)
      const nodeId = heliaNode.libp2p.peerId.toString()
      const nodeIsOnline = heliaNode.libp2p.isStarted()

      setHelia(heliaNode)
      setId(nodeId)
      setIsOnline(nodeIsOnline)
    }

    init()
  }, [helia])

  if (!helia || !id) {
    return <h4>Connecting to IPFS...</h4>
  }

  return (
    <div>
      <h4 data-test="id">ID: {id.toString()}</h4>
      <h4 data-test="status">Status: {isOnline ? 'Online' : 'Offline'}</h4>
    </div>
  )
}

export default UploadImage