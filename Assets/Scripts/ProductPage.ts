import {Interactable} from "../SpectaclesInteractionKit/Components/Interaction/Interactable/Interactable";
import {WebView} from "../Web View/WebView";

@component
export class ProductPage extends BaseScriptComponent {
  @input webButton1: SceneObject;
  @input icon1: Image;
  @input desc1: Text;
  @input webButton2: SceneObject;
  @input icon2: Image;
  @input desc2: Text;

  @input allIcons: Texture[];

  public link1: string = ""
  private webInter1: Interactable | null = null
  public link2: string = ""
  private webInter2: Interactable | null = null

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
      this.setWebViewLink(this.link1)
    })
    this.webInter2 = this.webButton2.getComponent(interactableTypeName)
    this.webInter2.onTriggerStart.add(() => {
      this.setWebViewLink(this.link2)
    })
  }

  setWebViewLink(str) {
    const webComp = this.webView.getComponent(WebView.getTypeName());
    if (webComp.isReady && this.webView) {
      this.webView.enabled = true;
      this.webView.getTransform().setWorldPosition(this.sceneObject.getTransform().getWorldPosition().add(this.getTransform().right.uniformScale(15)));
      this.webView.getTransform().setWorldRotation(this.sceneObject.getTransform().getWorldRotation())
      this.webView.getTransform().setWorldScale(vec3.one().uniformScale(0.3));
      webComp.goToUrl(str)
    }
  }

  public setInfo(webView, link1, desc1, icon1, link2, desc2, icon2) {
    this.desc1.text = desc1;
    this.link1 = link1;
    this.desc2.text = desc2;
    this.link2 = link2;

    this.webView = webView;
    this.webView.enabled = false;

    this.icon1.mainMaterial.mainPass.baseTex = this.allIcons[icon1 - 1];
    this.icon2.mainMaterial.mainPass.baseTex = this.allIcons[icon2 - 1];
  }
}
