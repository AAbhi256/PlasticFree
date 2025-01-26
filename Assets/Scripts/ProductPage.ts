import {Interactable} from "../SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import {WebView} from "../Web View/WebView";

@component
export class ProductPage extends BaseScriptComponent {
  @input webButton1: SceneObject;
  @input icon1: Image;
  @input desc1: Text;

  public link1: string = ""
  private webInter1: Interactable | null = null
  private webView: SceneObject | null = null

  onAwake() {
    this.createEvent("OnStartEvent").bind(() => {
      this.onStart()
    })
    this.sceneObject.enabled = false;
  }

  onStart() {
    const interactableTypeName = Interactable.getTypeName()
    this.webInter1 = this.webButton1.getComponent(interactableTypeName)
    this.webInter1.onTriggerStart.add(() => {
      const webComp = this.webView.getComponent(WebView.getTypeName());
      if (webComp.isReady) {
        this.webView.enabled = true;
        this.webView.getTransform().setWorldPosition(this.getTransform().getWorldPosition().add(this.getTransform().right.uniformScale(20)));
        this.webView.getTransform().setWorldRotation(this.getTransform().getWorldRotation())
        this.webView.getTransform().setWorldScale(vec3.one().uniformScale(0.2));
        webComp.goToUrl(this.link1)
      }
    })
  }

  public setInfo(webView, link1, desc1, icon1) {
    this.desc1.text = desc1;
    this.link1 = link1;
    this.webView = webView;
    this.webView.enabled = false;

    // this.icon1.mainMaterial.mainPass.baseTex
  }
}
