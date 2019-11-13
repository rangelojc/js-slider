(function (_context) {
    var _$ = function (selector) {
        return document.querySelector(selector);
    }

    var svg = '<?xml version="1.0" encoding="utf - 8"?> <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 70 70" style="enable-background:new 0 0 70 70;" xml:space="preserve"> <style type="text/css"> .st0{opacity:1;} .st1{fill:#d15f5f;} </style> <g id="Shape_18_copy" class="st0"> <g> <path class="st1" d="M20.2,4.5c0,1.7,0,3.7,0,5.4c8.1,8.1,16,16,24.1,24.1c-8.1,8.1-16,16-24.1,24.1l0,0c0,1.7,0,3.7,0,5.4 C30,53.7,39.8,43.8,49.7,34C39.8,24.2,30,14.3,20.2,4.5z"/> </g> </g> </svg>';

    var template = '\
    <div class="js-slider-container">\
        <div class="js-slider inactive">\
            <span class="js-label prompt">{{prompt}}</span>\
            <span class="js-label success">\
                {{success}} \
            </span>\
            <div class="js-bar" style=""></div>\
            <div class="js-handle" style="">\
                <span class="js-icon">{{svg}}</span>\
            </div>\
        </div>\
    </div>\
    ';

    function JS_Slider(parentId, options) {
        options = options || {}

        const component = {
            parentId: parentId,
            parent: _$('#' + parentId),
            handle: null,
            track: null,
            bar: null,
            success: null,

            labels: {
                prompt: options.prompt || "Slide now",
                success: options.success || "Slide OK"
            },

            trackw: 0,
            trackx: 0,
            handlew: 0,
            edgeoffset: 0,

            progress: 0,

            successful: false,
            progressThreshold: 70,

            _empty: function () { },

            grabHandle: function () {
                var owner = this;

                this.trackw = this.track.offsetWidth;
                this.handlew = this.handle.offsetWidth;
                this.trackx = this.track.getBoundingClientRect().left;

                this.track.classList.remove('transition');

                var funcLeave = function (evt) {
                    owner.dropHandle(evt)
                };

                var funcMove = function (evt) {
                    owner.dragHandle(evt)
                };

                this.track.onmouseleave = funcLeave;
                this.track.ontouchend = funcLeave;
                this.track.onmousemove = funcMove;
                this.track.ontouchmove = funcMove;

                this.handle.onmouseup = funcLeave;
                this.handle.ontouchend = funcLeave;
            },

            dragHandle: function (evt) {
                var trackw = this.trackw;
                var trackx = this.trackx;
                var handlew = this.handlew;

                var x = evt.touches ? evt.touches[0].clientX : evt.clientX;

                var computedx = (x - trackx);
                this.setProgress(computedx * 100 / trackw);

                if (computedx == 0) {
                    this.handle.style.marginLeft = this.edgeoffset + "px";
                } else if (computedx >= ((trackw - handlew / 2) - this.edgeoffset)) {
                    this.progress = 100;
                    this.dropHandle();
                } else if (computedx > 0 && computedx < trackw) {
                    this.handle.style.marginLeft = "-" + (handlew / 2) + "px";
                }
            },

            dropHandle: function () {
                var owner = this;

                if (this.progress >= this.progressThreshold) {
                    this.finalize();
                    this.onSuccess();

                } else {
                    this.rollback();
                    this.onFail();
                }

                this.handle.onmouseup = this._empty;
                this.handle.ontouchend = this._empty;
                this.track.onmousemove = this._empty;
                this.track.onmouseleave = this._empty;
                this.track.ontouchmove = this._empty;
                this.track.ontouchend = this._empty;
            },

            finalize: function () {
                var handlew = this.handlew;

                this.setProgress(100);

                this.handle.style.marginLeft = "-" + (handlew + this.edgeoffset) + "px"

                this.track.classList.add('success');
                this.track.classList.add('transition');

                this.handle.onmousedown = this._empty;
                this.handle.ontouchstart = this._empty;

                this.successful = true;
            },

            rollback: function () {
                this.setProgress(0);
                this.track.classList.add('transition');
                this.track.classList.remove('success');
                this.handle.style.marginLeft = this.edgeoffset + "px";
                this.successful = false;
            },

            setProgress: function (val) {
                this.progress = val;
                this.bar.style.width = this.progress + "%";
                this.handle.style.left = this.progress + "%";
            },

            setEvents: function () {
                var owner = this;

                var funcDown = function (evt) {
                    owner.grabHandle(evt)
                };
                var funcUp = function (evt) {
                    owner.dropHandle(evt)
                };

                this.handle.onmousedown = funcDown;
                this.handle.ontouchstart = funcDown;

                this.handle.onmouseup = funcUp;
                this.handle.ontouchend = funcUp;

                this.track.classList.remove('inactive');
            },

            render: function () {
                template = template
                    .replace("{{prompt}}", this.labels.prompt)
                    .replace("{{success}}", this.labels.success)
                    .replace("{{svg}}", svg)

                this.parent.insertAdjacentHTML("beforeend", template);

                this.handle = _$('#' + this.parentId + ' .js-handle');
                this.track = _$('#' + this.parentId + ' .js-slider');
                this.bar = _$('#' + this.parentId + ' .js-bar');
                this.success = _$('#' + this.parentId + ' .js-label.success');


            },

            init: function () {
                this.setEvents();
                this.rollback();
            },

            //External methods

            reset: function () {
                this.rollback();
                this.init();
                this.onReset();
            },

            onReset: function () { },
            onSuccess: function () { },
            onFail: function () { },
        }

        component.render();
        component.init();

        return component;
    }

    function _init() {
        if (_context.JS_Slider) {
            console.error("Failed to initialize JS_Slider, it is already existing in the Window object");
        }
        else {
            _context.JS_Slider = JS_Slider;
        }
    }

    _init();
})(window);