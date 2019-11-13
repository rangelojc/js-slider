

(function (_context) {
    var _$ = function (selector) {
        return document.querySelectorAll(selector);
    }

    var template = '\
    <div class="js-slider-container" id="login_auth_slider">\
        <div class="js-slider inactive">\
            <span class="js-label">{{message}}</span>\
            <span class="js-label success">\
                {{success}}\
            </span>\
            <div class="js-bar" style=""></div>\
            <div class="js-handle" style="">\
                <span class="p2p-icon auth-drag"></span>\
            </div>\
        </div>\
    </div>\
    ';

    function JS_Slider(parentId) {
        const component = {
            handle: _$('#' + parentId + ' .js-handle')[0],
            track: _$('#' + parentId + ' .js-slider')[0],
            bar: _$('#' + parentId + ' .js-bar')[0],
            success: _$('#' + parentId + ' .js-label.success')[0],

            trackw: 0,
            trackx: 0,
            handlew: 0,
            edgeoffset: 0,

            progress: 0, //not meant to be used outside, but you can also check this if it is at 0 or 100.

            verified: false, //use this to access a boolean of the slider's verification status
            progressThreshold: 70, //use this to set the percentage for when the slider will accept a successful verification

            _empty: function () { },

            grabHandle: function () {
                var owner = this;

                this.trackw = _$(this.track).outerWidth();
                this.handlew = _$(this.handle).outerWidth();
                this.trackx = _$(this.track).offset().left;

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

                this.verified = true;
            },

            rollback: function () {
                this.setProgress(0);
                this.track.classList.add('transition');
                this.track.classList.remove('success');
                this.handle.style.marginLeft = this.edgeoffset + "px";
                this.verified = false;
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

            init: function () {
                this.setEvents();
                this.rollback();
            },

            //External methods

            //use this method to force reset the slider. Note: not meant to be modified
            reset: function () {
                this.rollback();
                this.init();
                this.onReset();
            },

            //attach your custom function here during instantiation for when the slider has been reset
            onReset: function () { },

            //attach your custom function here during instantiation for when the authentication succeeds
            onSuccess: function () { },

            //attach your custom function here during instantation for when the authentication fails
            onFail: function () { },
        }

        component.init();

        return component;
    }

    function _init() {
        if (_context.JS_Slider) {
            console.error("Failed to initialize JS_Slider(), it is already existing in the Window object");
        }
        else {
            _context.JS_Slider = JS_Slider;
        }
    }

    _init();
})(window);