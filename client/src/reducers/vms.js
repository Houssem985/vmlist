const initialState = []
export default (state=initialState, action) => {
  switch (action.type) {
    case 'UPDATE_VMS':
      return state.map(vm => {
        if(vm.backend === action.payload.name) {
          // switch active flag for the selected backend
          vm.active = !vm.active
        }
        return vm
      })
    case 'LOAD_VMS':
      return state.concat(action.payload)
    case 'DELETE_VMS':
      return state.filter(vm => vm.backend !== action.payload.backend)
    default:
      return state
  }
}
