import _ from 'lodash'
export function pathDecorator(val){
    return (target, name, descriptor) => {
        _.set(target, ['attrs', name, 'path'], val || '')
        return descriptor
    }
}