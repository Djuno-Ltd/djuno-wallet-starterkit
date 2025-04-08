import React, { useState, useEffect } from 'react'
import { useWallet } from '@djuno/wallet-hook'
import { Button, Dropdown, EmptyState, SimpleTable, Tag, Typography, Input, Select, Modal, Flex } from 'djuno-design'
import { ReactComponent as EditIcon } from '../assets/icons/pencil-square.svg'
import { ReactComponent as PlusIcon } from '../assets/icons/plus.svg'
import { ReactComponent as TrashIcon } from '../assets/icons/trash.svg'
import { ReactComponent as MoreIcon } from '../assets/icons/more.svg'

const MainPage = () => {
  const { getNetworks, createWallet, updateWallet, deleteWallet, networks, wallets, loading } = useWallet()

  const [walletName, setWalletName] = useState('')
  const [selectedNetwork, setSelectedNetwork] = useState<string | undefined>(undefined)
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [walletToDelete, setWalletToDelete] = useState<string | null>(null)
  const [editingWalletId, setEditingWalletId] = useState<string | null>(null)

  // console.log('wallets', wallets)

  useEffect(() => {
    getNetworks()
  }, [])

  const handleCreateWallet = async () => {
    if (!walletName || !selectedNetwork || !selectedUserId) {
      setError('Please provide a wallet name, select a network, and select a user.')
      return
    }

    setIsSubmitting(true)
    try {
      await createWallet({
        NetworkId: parseInt(selectedNetwork),
        Name: walletName,
        UserId: selectedUserId,
      })

      setWalletName('')
      setSelectedNetwork(undefined)
      setSelectedUserId('')
      setError('')
      setShowCreateModal(false)
      await getNetworks()
    } catch (err) {
      setError('Failed to create wallet.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateWallet = async () => {
    if (!walletName || !selectedUserId) {
      setError('Please provide a wallet name and select a user.')
      return
    }

    if (!editingWalletId) {
      console.error('No wallet selected for update.')
      return
    }

    setIsSubmitting(true)
    try {
      await updateWallet(editingWalletId, {
        Name: walletName,
        UserId: selectedUserId,
      })

      setWalletName('')
      setSelectedNetwork(undefined)
      setSelectedUserId('')
      setError('')
      setShowCreateModal(false)
      setEditingWalletId(null)
      await getNetworks()
    } catch (err) {
      setError('Failed to update wallet.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteWallet = async (walletId: string) => {
    try {
      await deleteWallet(walletId)
      setWalletToDelete(null)
      await getNetworks()
    } catch (err) {
      console.error('Failed to delete wallet:', err)
    }
  }

  const handleEditWallet = (wallet: any) => {
    setEditingWalletId(wallet.Id)
    setWalletName(wallet.Name)

    const matchingNetwork = networks.find((network) => {
      return `${network.NetworkName}${network.NetworkCode}` === wallet.Network
    })

    if (matchingNetwork) {
      setSelectedNetwork(String(matchingNetwork.Id))
    } else {
      setSelectedNetwork('')
    }

    setSelectedUserId(wallet.UserId)
    setShowCreateModal(true)
  }

  return (
    <div className='p-6 bg-white text-gray-900 w-full max-w-5xl mx-auto'>
      <div className='flex items-center justify-between'>
        <Typography.Title level={5} className='!mb-0'>
          Wallets
        </Typography.Title>
        <Button uiType='primary' onClick={() => setShowCreateModal(true)} className='group'>
          Add Wallet
          <PlusIcon className='w-4 h-4 ml-2' />
        </Button>
      </div>
      <div className='mt-5 w-full'>
        <SimpleTable loading={loading.wallets} containerClassName='min-h-[240px]'>
          <SimpleTable.Head>
            <SimpleTable.Row>
              <SimpleTable.TH lable='Name' />
              <SimpleTable.TH lable='Network' />
              <SimpleTable.TH lable='Status' />
              <SimpleTable.TH lable='Actions' />
            </SimpleTable.Row>
          </SimpleTable.Head>
          <SimpleTable.Body>
            {wallets.length > 0 ? (
              wallets.map((wallet) => (
                <SimpleTable.Row key={wallet.Id}>
                  <SimpleTable.TD>{wallet.Name}</SimpleTable.TD>
                  <SimpleTable.TD>{wallet.Network}</SimpleTable.TD>
                  <SimpleTable.TD>
                    <Tag color={wallet.Status === 'Active' ? 'success' : 'warning'}>{wallet.Status}</Tag>
                  </SimpleTable.TD>
                  <SimpleTable.TD className='w-20'>
                    <Dropdown
                      itemsClassName='!w-48'
                      anchor='bottom end'
                      menu={[
                        {
                          key: 'edit',
                          label: (
                            <div className='flex items-center gap-1'>
                              <EditIcon className='w-4' />
                              Edit
                            </div>
                          ),
                          onClick: () => handleEditWallet(wallet),
                        },
                        { type: 'divider' },
                        {
                          key: 'delete',
                          label: (
                            <div className='flex items-center gap-1 text-red-500'>
                              <TrashIcon className='w-4' />
                              Delete
                            </div>
                          ),
                          onClick: () => setWalletToDelete(wallet.Id),
                        },
                      ]}
                    >
                      <Button uiType='icon' uiSize='small' className='!px-2'>
                        <MoreIcon className='w-4 h-4' />
                      </Button>
                    </Dropdown>
                  </SimpleTable.TD>
                </SimpleTable.Row>
              ))
            ) : (
              <SimpleTable.Row>
                <SimpleTable.TD colSpan={4} className='text-center'>
                  <EmptyState text='No wallets created yet.' />
                </SimpleTable.TD>
              </SimpleTable.Row>
            )}
          </SimpleTable.Body>
        </SimpleTable>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          setWalletName('')
          setSelectedNetwork(undefined)
          setSelectedUserId('')
          setError('')
          setEditingWalletId(null)
        }}
        title={editingWalletId ? 'Edit Wallet' : 'Create Wallet'}
        contentClassName='max-w-lg'
      >
        <Flex direction='col' className='gap-5 w-full mt-5'>
          <Input
            label='Wallet Name'
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            placeholder='Enter wallet name'
            required
          />
          {editingWalletId ? (
            <div>
              <Typography.Text>
                Network: {editingWalletId ? wallets.find((wallet) => wallet.Id === editingWalletId)?.Network : ''}
              </Typography.Text>
            </div>
          ) : (
            <Select
              label='Network'
              value={selectedNetwork}
              onChange={(value) => setSelectedNetwork(value)}
              options={networks.map((network) => ({
                label: `${network.NetworkName} (${network.NetworkCode})`,
                value: String(network.Id),
              }))}
              required
            />
          )}

          <Select
            label='User ID'
            value={selectedUserId}
            onChange={(value) => setSelectedUserId(value)}
            options={[
              { label: 'User 1', value: 'user-1' },
              { label: 'User 2', value: 'user-2' },
              { label: 'User 3', value: 'user-3' },
              { label: 'User 4', value: 'user-4' },
              { label: 'User 5', value: 'user-5' },
              { label: 'User 6', value: 'user-6' },
              { label: 'User 7', value: 'user-7' },
              { label: 'User 8', value: 'user-8' },
              { label: 'User 9', value: 'user-9' },
              { label: 'User 10', value: 'user-10' },
            ]}
          />

          {error && <Typography.Text color='error'>{error}</Typography.Text>}
          <Flex justify='end' className='mt-4 gap-3'>
            <Button
              uiType='light'
              onClick={() => {
                setShowCreateModal(false)
                setWalletName('')
                setSelectedNetwork(undefined)
                setSelectedUserId('')
                setError('')
                setEditingWalletId(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={editingWalletId ? handleUpdateWallet : handleCreateWallet} disabled={isSubmitting}>
              {isSubmitting
                ? editingWalletId
                  ? 'Updating Wallet...'
                  : 'Creating Wallet...'
                : editingWalletId
                  ? 'Update Wallet'
                  : 'Create Wallet'}
            </Button>
          </Flex>
        </Flex>
      </Modal>

      {walletToDelete && (
        <Modal isOpen onClose={() => setWalletToDelete(null)} title='Delete Wallet' contentClassName='max-w-lg mt-5'>
          <Typography.Text>Are you sure you want to delete this wallet?</Typography.Text>
          <Flex justify='end' className='mt-4 gap-3'>
            <Button onClick={() => setWalletToDelete(null)} uiType='light'>
              Cancel
            </Button>
            <Button onClick={() => handleDeleteWallet(walletToDelete)} uiType='danger'>
              Delete
            </Button>
          </Flex>
        </Modal>
      )}
    </div>
  )
}

export default MainPage
