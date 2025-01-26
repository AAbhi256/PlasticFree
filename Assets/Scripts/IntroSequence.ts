import {Interactable} from "../SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import NativeLogger from "../SpectaclesInteractionKit/Utils/NativeLogger";

@component
export class IntroSequence extends BaseScriptComponent {
    @input
    startScreen: SceneObject
    @input
    introScreen1: SceneObject
    @input
    introScreen2: SceneObject
    @input
    introScreen3: SceneObject
    @input
    introScreen4: SceneObject
    @input
    instructions: SceneObject

    @input
    startButton: SceneObject
    @input
    nextButton: SceneObject
    @input
    screen1Button: SceneObject
    @input
    screen2Button: SceneObject
    @input
    screen3Button: SceneObject

    private startInter: Interactable | null = null
    private nextInter: Interactable | null = null
    private screen1Inter: Interactable | null = null
    private screen2Inter: Interactable | null = null
    private screen3Inter: Interactable | null = null
    onAwake() {
        this.createEvent("OnStartEvent").bind(() => {
            this.onStart()
        })
    }
    onStart() {
        this.startScreen.enabled = true;
        this.introScreen1.enabled = false;
        this.introScreen2.enabled = false;
        this.introScreen3.enabled = false;
        this.introScreen4.enabled = false;

        const interactableTypeName = Interactable.getTypeName()
        this.startInter = this.startButton.getComponent(interactableTypeName)
        this.nextInter = this.nextButton.getComponent(interactableTypeName)
        this.screen1Inter = this.screen1Button.getComponent(interactableTypeName)
        this.screen2Inter = this.screen2Button.getComponent(interactableTypeName)
        this.screen3Inter = this.screen3Button.getComponent(interactableTypeName)

        this.startInter.onTriggerEnd.add(() => {
            this.startScreen.enabled = false;
            this.introScreen1.enabled = true;
        })

        this.screen1Inter.onTriggerEnd.add(() => {
            this.introScreen1.enabled = false;
            this.introScreen2.enabled = true;
        })

        this.screen2Inter.onTriggerEnd.add(() => {
            this.introScreen2.enabled = false;
            this.introScreen3.enabled = true;
        })

        this.screen3Inter.onTriggerEnd.add(() => {
            this.introScreen3.enabled = false;
            this.introScreen4.enabled = true;
        })

        this.nextInter.onTriggerEnd.add(() => {
            this.instructions.enabled = true;
            this.sceneObject.enabled = false;
        })
    }

}
