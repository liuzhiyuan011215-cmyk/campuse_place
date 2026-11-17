import { Dices, Star, ThumbsUp, X } from "lucide-react";
import { coverFor } from "../lib/cover";
import { useLang } from "../lib/i18n";
import { placeText, type PlaceView } from "../lib/places";
import { categoryIcon } from "./categoryIcon";
import { Modal } from "./Modal";
import { PlaceImage } from "./PlaceImage";

interface Props {
  place: PlaceView;
  canReroll: boolean;
  onReroll: () => void;
  onOpenDetail: (id: string) => void;
  onClose: () => void;
}

export function RandomPickDialog({ place, canReroll, onReroll, onOpenDetail, onClose }: Props) {
  const { lang, t } = useLang();
  const text = placeText(place, lang);
  const cover = coverFor(place, t, text.name);
  const Icon = categoryIcon(place.category);
  const zoneLabel = place.zone ? { front: t.zoneFront, city: t.zoneCity, suburb: t.zoneSuburb }[place.zone] : "";
  const sub = [zoneLabel, text.food].filter(Boolean).join(" · ");
  const line = place.isFood ? text.summary || text.menu.slice(0, 3).join(", ") : text.summary || text.location;

  return (
    <Modal labelledBy="randomPickTitle" onClose={onClose} className="authDialog">
      <div className="dialogHead">
        <h2 id="randomPickTitle">
          <Dices size={18} aria-hidden="true" style={{ verticalAlign: "-3px", marginRight: 6 }} />
          {t.randomPickTitle}
        </h2>
        <button type="button" className="iconButton" onClick={onClose} aria-label={t.close}>
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="dialogBody pickBody">
        <div className="pickHero" data-category={place.category}>
          {cover ? (
            <PlaceImage className="pickImage" src={cover.src} srcSet={cover.srcSet} sizes="400px" alt={cover.alt} />
          ) : (
            <Icon size={40} aria-hidden="true" />
          )}
          <span className="badge">{text.category}</span>
        </div>
        {place.solo === "good" && (
          <div className="badges">
            <span className="badge solo">{t.soloBadge}</span>
          </div>
        )}
        <h3 className="pickName">{text.name}</h3>
        {text.nameKo && (
          <p className="cardAlt" lang="ko">
            {text.nameKo}
          </p>
        )}
        {sub && <p className="subLine">{sub}</p>}
        {line && <p className="pickLine">{line}</p>}
        <p className="meta">
          {place.rating !== undefined && (
            <span className="star">
              <Star size={14} aria-hidden="true" fill="currentColor" />
              {place.rating.toFixed(1)}
            </span>
          )}
          {place.distanceKm !== undefined && place.distanceKm > 0 && <span>{place.distanceKm}km</span>}
          <span className="recommend">
            <ThumbsUp size={14} aria-hidden="true" />
            {t.recommendCount(place.recommendations)}
          </span>
        </p>
        <div className="pickActions">
          <button type="button" className="button" onClick={onReroll} disabled={!canReroll}>
            <Dices size={16} aria-hidden="true" />
            {t.randomAgain}
          </button>
          <button type="button" className="button primary" onClick={() => onOpenDetail(place.id)}>
            {t.randomDetail}
          </button>
        </div>
      </div>
    </Modal>
  );
}
