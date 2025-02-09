import * as Phaser from 'phaser';
import { colorPalette } from '../../../assets/colorPalette';
import eventCenter, { SettingsEvents, UIEvents } from '../../events/eventCenter';
import { getColorInt, getGameWidth } from '../../helpers';
import { modal } from './modal';
import { title } from '../text/title';

const backgroundColor = colorPalette.darkPurpleish;
const accentColor = colorPalette.periwinkle;
const checkedUnicode = '\uf14a ';
const uncheckedUnicode = '\uf0c8 ';

export const settingsModal = function (scene: Phaser.Scene, settings: GameSettings, onClose: () => void) {
	let musicEnabled = settings.music;
	let soundEffectsEnabled = settings.soundEffects;

	const toggleSetting = (setting: string): void => {
		switch (setting) {
			case 'music':
				musicEnabled = !musicEnabled;
				eventCenter.emit(UIEvents.UI_UPDATE_SOUND, { event: SettingsEvents.TOGGLE_MUSIC });
				break;
			case 'soundEffects':
				soundEffectsEnabled = !soundEffectsEnabled;
				eventCenter.emit(UIEvents.UI_UPDATE_SOUND, { event: SettingsEvents.TOGGLE_SOUND_EFFECTS });
				break;
		}
		makeSettings(scene, musicEnabled, soundEffectsEnabled, toggleSetting, modalContainer);
	};

	const closeEvent = () => {
		if (soundEffectsEnabled) {
			scene.sound.play('click');
		}
		onClose();
	};

	// Add modal background
	const modalContainer = modal(scene, backgroundColor, accentColor, closeEvent, true);

	// Title
	const settingsTitle = title(scene, 'Settings');
	modalContainer.add(settingsTitle);

	makeSettings(scene, musicEnabled, soundEffectsEnabled, toggleSetting, modalContainer);

	eventCenter.on(
		UIEvents.UI_UPDATE_SOUND,
		(data) => {
			toggleSetting(data.event);
		},
		this,
	);
};

const refreshSettings = (container: Phaser.GameObjects.Container) => {
	if (container.getByName("musicCheckbox")) {
		container.getByName("musicCheckbox").destroy();
	}
	if (container.getByName("musicLabel")) {
		container.getByName("musicLabel").destroy();
	}
	if (container.getByName("soundEffectsCheckbox")) {
		container.getByName("soundEffectsCheckbox").destroy();
	}
	if (container.getByName("soundEffectsLabel")) {
		container.getByName("soundEffectsLabel").destroy();
	}
}

const makeSettings = (
	scene: Phaser.Scene,
	musicEnabled: boolean,
	soundEffectsEnabled: boolean,
	toggleSetting: (string) => void,
	container: Phaser.GameObjects.Container,
) => {
	const settingsX = (getGameWidth(scene) - 32 * 2) / 2;
	const settingsY = 182;
	refreshSettings(container);
	
	const musicCheckbox = scene.make
		.text({
			x: settingsX - 32,
			y: settingsY,
			text: musicEnabled ? checkedUnicode : uncheckedUnicode,
			style: {
				font: 'bold 16px FontAwesome',
				color: colorPalette.white,
				align: 'center',
			},
		})
		.setName("musicCheckbox")
		.setInteractive({ useHandCursor: true })
		.on('pointerover', function () {
			this.setTint(getColorInt(accentColor));
		})
		.on('pointerout', function () {
			this.clearTint();
		})
		.on('pointerdown', function () {
			toggleSetting('music');
		});
	container.add(musicCheckbox);

	const musicLabel = scene.make.text({
		x: settingsX,
		y: settingsY,
		text: 'Play music',
		style: {
			font: 'bold 16px Arial',
			color: colorPalette.white,
		},
	}).setName("musicLabel");
	container.add(musicLabel);

	const soundEffectsCheckbox = scene.make
		.text({
			x: settingsX - 32,
			y: settingsY + 30,
			text: soundEffectsEnabled ? checkedUnicode : uncheckedUnicode,
			style: {
				font: 'bold 16px FontAwesome',
				color: colorPalette.white,
				align: 'center',
			},
		})
		.setName("soundEffectsCheckbox")
		.setInteractive({ useHandCursor: true })
		.on('pointerover', function () {
			this.setTint(getColorInt(accentColor));
		})
		.on('pointerout', function () {
			this.clearTint();
		})
		.on('pointerdown', function () {
			toggleSetting('soundEffects');
		});
	container.add(soundEffectsCheckbox);


	const soundEffectsLabel = scene.make.text({
		x: settingsX,
		y: settingsY + 30,
		text: 'Play sound effects',
		style: {
			font: 'bold 16px Arial',
			color: colorPalette.white,
		},
	}).setName("soundEffectsLabel");
	container.add(soundEffectsLabel);
};
