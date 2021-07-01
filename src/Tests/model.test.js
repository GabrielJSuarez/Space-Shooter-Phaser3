import Model from '../Model';

describe('model', () => {
    const newModel = new Model();

    test('a new model instance', () => {
        expect(newModel).toEqual({ _bgMusicPlaying: false, _musicOn: true});
    });

    test('check the background music state', () => {
        expect(newModel._bgMusicPlaying).toEqual(false);
    });

    test('check the music state', () => {
        expect(newModel._musicOn).toEqual(true);
    });

    test('Test that you can turn change the background music playback', () => {
        newModel._bgMusicPlaying = true;
        expect(newModel._bgMusicPlaying).toEqual(true);
    });

    test('Test that you can change the music playback state', () => {
        newModel._musicOn = false;
        expect(newModel._musicOn).toEqual(false);
    });
});