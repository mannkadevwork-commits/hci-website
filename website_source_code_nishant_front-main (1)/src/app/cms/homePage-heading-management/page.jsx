"use client";

import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { FaSave } from "react-icons/fa";
import api from "@/utils/api";
import AuthMainLayout from "../../layouts/auth/AuthMainLayout";

const HEADING_DEFS = [
  {
    key: "ready_to_go_designs",
    label: "Ready To Go Designs (Home Page Section)",
    tag: "h2",
    hasSpan: true,
    hasHeading: true,
  },
  {
    key: "designers_choice",
    label: "Designer's Choice: Exclusive Design Specials",
    tag: "h2",
    hasSpan: true,
    hasHeading: true,
  },
  {
    key: "celebrating_excellence",
    label: "Celebrating Excellence (Counter Section)",
    tag: "h2",
    hasSpan: false,
    hasHeading: true,
    note: "Rendered inside the CounterRow component on the home page.",
  },
  {
    key: "blogs",
    label: "Blogs Section Heading",
    tag: "h2",
    hasSpan: false,
    hasHeading: true,
  },
  {
    key: "what_people_say",
    label: "What People Say (Testimonial Section)",
    tag: "span",
    hasSpan: true,
    hasHeading: false,
  },
];

const defaultEntry = () => ({
  text: "",
  color: "#222222",
  spanText: "",
  spanColor: "#ff914d",
});

export default function ManageHomePageHeadings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [entries, setEntries] = useState(() => {
    const initial = {};
    HEADING_DEFS.forEach((def) => (initial[def.key] = defaultEntry()));
    return initial;
  });

  // Record id for the single home_page_heading_management row, so Save
  // knows whether to PATCH (already exists) or POST (first time ever saved).
  const [recordId, setRecordId] = useState(null);

  const readRecord = (res) => {
    if (!res?.data) return null;
    return Array.isArray(res.data) ? res.data[0] : res.data;
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // OK for this to 404/return nothing the very first time this page is
      // used — the record is created on first Save.
      const localRes = await api
        .get("/cms-content/home_page_heading_management")
        .catch(() => null);

      const localRecord = readRecord(localRes);
      const localHeadings = localRecord?.json_content?.headings || {};

      setRecordId(localRecord?.id || null);

      const hydrated = {};
      HEADING_DEFS.forEach((def) => {
        const source = localHeadings[def.key] || {};
        hydrated[def.key] = {
          text: source.text ?? "",
          color: source.color || "#222222",
          spanText: source.spanText || "",
          spanColor: source.spanColor || "#ff914d",
        };
      });

      setEntries(hydrated);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load heading data.");
    } finally {
      setLoading(false);
    }
  }, []);
    useEffect(() => {
  fetchData();
}, [fetchData]);

  const handleEntryChange = (key, field, value) => {
    setEntries((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const localHeadings = {};
      HEADING_DEFS.forEach((def) => {
        localHeadings[def.key] = entries[def.key];
      });

      if (recordId) {
        await api.patch(`/cms-content/${recordId}`, {
          json_content: { headings: localHeadings },
        });
      } else {
        await api.post(`/cms-content/home_page_heading_management`, {
          json_content: { headings: localHeadings },
        });
      }

      toast.success("All headings saved successfully.");
      fetchData();
    } catch (err) {
      console.log(err);
      toast.error("Failed to save headings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AuthMainLayout>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "60vh" }}
        >
          <div className="spinner-border text-warning" />
        </div>
      </AuthMainLayout>
    );
  }

  return (
    <AuthMainLayout>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1">Home Page Heading Management</h2>
            <small className="text-muted">
              Edit the remaining home page headings.
            </small>
          </div>

          <button className="btn btn-success" disabled={saving} onClick={handleSave}>
            <FaSave className="me-2" />
            {saving ? "Saving..." : "Save All"}
          </button>
        </div>

        {HEADING_DEFS.map((def) => {
          const entry = entries[def.key];
          const PreviewTag = def.tag;

          return (
            <div key={def.key} className="card shadow-sm border-0 mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="fw-bold mb-0">{def.label}</h5>
                </div>

                {def.note && (
                  <div className="alert alert-secondary py-2 px-3 small mb-3">{def.note}</div>
                )}

                <div className="row g-3">
                  {/* Field order intentionally matches the Preview below: span
                      (eyebrow) first, heading second — since that's the order
                      they're stacked visually on the live site. */}
                  {def.hasSpan && (
                    <>
                      <div className="col-md-9">
                        <label className="form-label fw-bold">Span / Eyebrow Text</label>
                        <input
                          className="form-control"
                          value={entry.spanText}
                          onChange={(e) => handleEntryChange(def.key, "spanText", e.target.value)}
                          placeholder="e.g. Explore"
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label fw-bold">Span Color</label>
                        <input
                          type="color"
                          className="form-control form-control-color w-100"
                          value={entry.spanColor}
                          onChange={(e) => handleEntryChange(def.key, "spanColor", e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {def.hasHeading && (
                    <>
                      <div className="col-md-9">
                        <label className="form-label fw-bold">Heading Text</label>
                        <input
                          className="form-control"
                          value={entry.text}
                          onChange={(e) => handleEntryChange(def.key, "text", e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className="form-label fw-bold">Heading Color</label>
                        <input
                          type="color"
                          className="form-control form-control-color w-100"
                          value={entry.color}
                          onChange={(e) => handleEntryChange(def.key, "color", e.target.value)}
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Live preview using the fixed tag + chosen colors */}
                <div className="mt-3 p-3 bg-light rounded">
                  <small className="text-muted d-block mb-2">Preview</small>
                  {def.hasSpan && entry.spanText && (
                    <div
                      className="fw-bold mb-1"
                      style={{ color: entry.spanColor, fontSize: "0.85rem", textTransform: "uppercase" }}
                    >
                      {entry.spanText}
                    </div>
                  )}
                  {def.hasHeading &&
                    React.createElement(
                      PreviewTag,
                      { style: { color: entry.color, margin: 0 } },
                      entry.text || <span className="text-muted"></span>
                    )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AuthMainLayout>
  );
}
