// import '../styles/app.scss'

import Quill from 'quill'

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ header: [3, 4, 5] }],
    ['clean'] // remove formatting button
]
var quill = new Quill('.editor', {
    theme: 'snow',
    modules: {
        toolbar: toolbarOptions
    }
})
